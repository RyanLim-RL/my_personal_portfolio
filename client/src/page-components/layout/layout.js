import { Outlet } from "react-router-dom";
import NavBar from "./navbar";
import { useNav } from "../../contexts/navcontext";
import { useEffect, useRef } from "react";
import "../../styles/layout_styles/layout.css";

const Layout = () => {
  const { switching, path, animationDone } = useNav();
  const layoutRef = useRef(null);

  useEffect(() => {
    if (!layoutRef.current) return;
    if (switching) {
      layoutRef.current.style.opacity = 0;
      layoutRef.current.style.transition = "opacity 1.45s ease-in-out";


    } else {
      layoutRef.current.style.transition = "opacity 1.45s ease-in-out";
      layoutRef.current.style.opacity = 1;

    }
  }, [switching]);

  return (
    <div className="layout-container">
      <NavBar />

      <div ref={layoutRef} className="layout">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;