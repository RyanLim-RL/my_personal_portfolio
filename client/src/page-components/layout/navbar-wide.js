import React, { useEffect, useState, useRef } from "react";
import "../../styles/layout_styles/navbar_wide.css";

import { useNavigate } from "react-router-dom";
import { useNav } from "../../contexts/navcontext";
import Player from "./player";

const NavBar = () => {
    const navigate = useNavigate();
    const { animationDone, nonHome, switching, setSwitching, path, footer, pastPoint } = useNav();
    const [style, setStyle] = useState("transparent");
    

    /* Show navbar depending on the page */
    useEffect(() => {
        const navbar = document.querySelector(".navbar-wide");
        if (!navbar) return;
        if (switching || (footer && !nonHome)) {
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

    /* Handle hover effect on navbar for circle divs*/
    const handleHover = (direction, action) => {
        const oldDivs = document.querySelectorAll(".l_old");
        const targetDivs = document.querySelectorAll(`.l_${direction}`);
        const c_divs = document.querySelectorAll(`.c_${direction}`);

        const transformValue =
            action === "enter"
                ? direction === "left"
                    ? "translateX(100%)"
                    : direction === "right"
                        ? "translateX(-100%)"
                        : "translateY(-100%)"
                : "translate(0%)";

        [...oldDivs, ...targetDivs, ...c_divs].forEach((div) => {
            div.style.transition = "transform 0.6s ease-in-out";
            div.style.transform = transformValue;

        });
    };


    /* Change navbar color depending on the page */
    useEffect(() => {
        if (path === "/" && pastPoint) {
            setStyle("whitePurple");
        } else if (path === "/") {
            setStyle("transparent");
        } else if (path === "/about") {
            setStyle("orange");
        } else if (path === "/contact") {
            setStyle("black");
        } else if (path === "/projects") {
            setStyle("black");
        }
    }, [path, pastPoint]);

    useEffect(() => {
        const elementsToToggle = {
            backgrounds: [".midNav", ".leftNav", ".rightNav"],
            textOld: [".old-text", ".l_old_text"],
            textNew: [".new-text", ".l_left_text", ".l_right_text", ".l_down_text"],
            boxes: [".box", ".c_left", ".c_right", ".c_down", ".c_right_play"],
        };
        const styles = {
            black: {
                backgrounds: "background_white",
                textOld: "text-black",
                textNew: "text-white",
                boxes: "box-colored-black",
            },
            red: {
                backgrounds: "background_white",
                textOld: "text-black",
                textNew: "text-white",
                boxes: "box-colored-purple",
            },
            orange: {
                backgrounds: "background_white",
                textOld: "text-black",
                textNew: "text-black",
                boxes: "box-colored-orange",
            },
            whitePurple: {
                backgrounds: "background_white",
                textOld: "text-black",
                textNew: "text-white",
                boxes: "box-colored-purple",
            },
            transparent: {
                backgrounds: "background_transparent",
                textOld: "text-white",
                textNew: "text-black",
                boxes: "box-colored-white",
            },
            blackAbout: {
                backgrounds: "background_black",
                textOld: "text-white",
                textNew: "text-white",
                boxes: "box-colored-black-light",
            },
        };
        const applyStyle = () => {
            const theme = styles[style];
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
            navigate(path_in);
        }, 1500);
    };

    return (
        <div className="navbar-wide">
            <div className="leftNav" onClick={() => handleClick("/")}>
                <div className="text_box">
                    <div className="old_t">
                        <span className="old-text">Home</span>
                    </div>
                    <div className="new_t">
                        <span className="new-text">Home</span>
                    </div>
                </div>
                <div className="box"></div>
            </div>
            <div className="midNav">
                <div
                    className="proj"
                    onMouseEnter={() => handleHover("left", "enter")}
                    onMouseLeave={() => handleHover("left", "leave")}
                    onClick={() => handleClick("/projects")}
                >
                    <div className="l_old">
                        <span className="l_old_text">Projects</span>
                    </div>
                    <div className="l_left">
                        <span className="l_left_text">Projects</span>
                    </div>
                    <div className="l_right">
                        <span className="l_right_text">Projects</span>
                    </div>
                    <div className="l_down">
                        <span className="l_down_text">Projects</span>
                    </div>
                </div>

                <div
                    className="about"
                    onMouseEnter={() => handleHover("down", "enter")}
                    onMouseLeave={() => handleHover("down", "leave")}
                    onClick={() => handleClick("/about")}
                >
                    <div className="l_old">
                        <span className="l_old_text">About</span>
                    </div>
                    <div className="l_left">
                        <span className="l_left_text">About</span>
                    </div>
                    <div className="l_right">
                        <span className="l_right_text">About</span>
                    </div>
                    <div className="l_down">
                        <span className="l_down_text">About</span>
                    </div>
                </div>

                <div
                    className="contact"
                    onMouseEnter={() => handleHover("right", "enter")}
                    onMouseLeave={() => handleHover("right", "leave")}
                    onClick={() => handleClick("/contact")}
                >
                    <div className="l_old">
                        <span className="l_old_text">Contact</span>
                    </div>
                    <div className="l_left">
                        <span className="l_left_text">Contact</span>
                    </div>
                    <div className="l_right">
                        <span className="l_right_text">Contact</span>
                    </div>
                    <div className="l_down">
                        <span className="l_down_text">Contact</span>
                    </div>
                </div>
                <div className="c_left"></div>
                <div className="c_right"></div>
                <div className="c_down"></div>
            </div>
            <div className="rightNav">
                <Player style={style} />
            </div>
        </div>
    );
};
export default NavBar;
