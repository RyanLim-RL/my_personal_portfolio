import React, { useEffect, useState } from "react";
import "../../styles/layout_styles/navbar.css";
import NavBarWide from "./navbar-wide";
import NavBarTiny from "./navbar-tiny";

const NavBar = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <div className="navbar">
            {isMobile ? (
                <NavBarTiny key="navbar-tiny" />
            ) : (
                <NavBarWide key="navbar-wide" />
            )}
        </div>
    );
};
export default NavBar;
