import React, { useEffect, useState } from "react";
import "../../styles/layout_styles/navbar_tiny.css";
import { useNavigate } from "react-router-dom";
import { useNav } from "../../contexts/navcontext";
import Player from "./player";

const NavBarTiny = () => {
    const navigate = useNavigate();
    const { animationDone, nonHome, switching, setSwitching, path, footer, pastPoint } = useNav();
    const [style, setStyle] = useState("transparent");
    const [menuOpen, setMenuOpen] = useState(false);


        useEffect(() => {
            const navbar = document.querySelector(".navbar-tiny");
            if (!navbar) return;
            if (footer && !nonHome) {
                navbar.style.transform = "translateY(-100%)";
                navbar.style.transition = "transform 1s ease-in-out";
            } else if (animationDone || nonHome) {
                navbar.style.transform = "translateY(0)";
                navbar.style.transition = "transform 1s ease-in-out";
            } else {
                navbar.style.transform = "translateY(-100%)";
                navbar.style.transition = "transform 1s ease-in-out";
            }
        }, [animationDone, nonHome, switching, footer]);

    useEffect(() => {
        if (path === "/" && pastPoint) setStyle("whitePurple");
        else if (path === "/") setStyle("transparent");
        else if (path === "/about") setStyle("orange");
        else if (path === "/contact") setStyle("black");
        else if (path === "/projects") setStyle("black");
    }, [path, pastPoint]);

     useEffect(() => {
            const elementsToToggle = {
                backgrounds: [".play-logo-tiny"],        
                boxes: [ ".c_right_play"],
                lines: [".line1-nav", ".line2-nav", ".line3-nav"]
            };
            const styles = {
                black: {
                    backgrounds: "background_white",
                    lines: "line-colored-black",
                    boxes: "box-colored-black",
                },
                red: {
                    backgrounds: "background_white",
                    lines: "line-colored-red",
                    boxes: "box-colored-purple",
                },
                orange: {
                    backgrounds: "background_white",
                    lines: "line-colored-orange",
                    boxes: "box-colored-orange",
                },
                whitePurple: {
                    backgrounds: "background_white",
                    lines: "line-colored-black",
                    boxes: "box-colored-purple",
                },
                transparent: {
                    backgrounds: "background_transparent",
                    lines: "line-colored-white",
                    boxes: "box-colored-white",
                },
                blackAbout: {
                    backgrounds: "background_black",
                    lines: "line-colored-black-light",
                    boxes: "box-colored-black-light",
                },
            };
            const applyStyle = () => {
                const theme = styles[style];
                console.log(style)
                Object.keys(elementsToToggle).forEach((category) => {
                    elementsToToggle[category].forEach((selector) => {
                        document.querySelectorAll(selector).forEach((el) => {
                            el.classList.add(theme[category]);
                        });
                    });
                });
            };
    
            const removeStyle = () => {
                Object.keys(elementsToToggle).forEach((category) => {
                    elementsToToggle[category].forEach((selector) => {
                        document.querySelectorAll(selector).forEach((el) => {
                            Object.values(styles).forEach((style) => {
                                el.classList.remove(style[category]);
                            });
                        });
                    });
                });
            };
    
            removeStyle();
            applyStyle();
        }, [style]);


    const handleClick = (path_in) => {
        if (switching) return;
        setSwitching(true);
        setTimeout(() => {
            setMenuOpen(false);
            navigate(path_in);
        }, 1500);
    };

    const openMenu = () => {
        setMenuOpen(!menuOpen);
        if (!menuOpen) {
            document.querySelector(".line1-nav").style.transform = "rotate(-45deg) translate(-7.07px, 7.07px)";
            document.querySelector(".line2-nav").style.transform = "scale(0, 1) translate(-141.4px)";
            document.querySelector(".line3-nav").style.transform = "rotate(45deg) translate(-7.07px, -7.07px)";
        } else {
            document.querySelector(".line1-nav").style.transform = "none";
            document.querySelector(".line2-nav").style.transform = "none";
            document.querySelector(".line3-nav").style.transform = "none";
        }
    }



    return (
        <div className='navbar-tiny'>
            
                <div className="play-logo-tiny">
                    <Player style={style} />
                </div>
            
            <div className="hamburger" onClick={openMenu}>
                <div className="hamburger-animation">
                    <div className="line1-nav"></div>
                    <div className="line2-nav"></div>
                    <div className="line3-nav"></div>
                </div>
        
            </div>
            {menuOpen && (
                <div className="menu-nav">
                    <div className="menu-item home-nav-tiny" onClick={() => handleClick("/")}>
                        Home
                    </div>
                    <div className="menu-item about-nav-tiny" onClick={() => handleClick("/about")}>
                        About
                    </div>
                    <div className="menu-item proj-nav-tiny" onClick={() => handleClick("/projects")}>
                        Projects
                    </div>
                    <div className="menu-item contact-nav-tiny" onClick={() => handleClick("/contact")}>
                        Contact
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBarTiny;