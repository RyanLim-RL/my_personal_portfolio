import { Outlet } from "react-router-dom";
import NavBar from "./navbar";
import { useNav } from "../../contexts/navcontext";
import { useEffect, useState } from "react";
import "../../styles/layout_styles/layout.css";


const Layout = () => {
  const { switching, path, animationDone } = useNav();


  useEffect(() => {
    const transition = document.querySelector(".transition");

    if (switching) {     
      if (path === "/") {
       transition.style.backgroundColor = "rgb(57, 0, 149)";
      }else if (path === "/about") {
        transition.style.backgroundColor = "rgb(247, 178, 59)";
      }else if (path === "/projects") {
        transition.style.backgroundColor = "rgb(0,0,0)";
      }else if (path === "/contact") {
        transition.style.backgroundColor = "rgb(157, 157, 240)";
      }

      transition.style.transform = "translateY(100dvh)";
    } else {
      transition.style.transform = "translateY(-100dvh)";
    }
  }, [switching]);

  return (
    <div className="layout-container">
      <div className="transition">
        <div className="transition-inner">YI MING
        </div>
      </div>
      <NavBar />
      <div className="layout">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;