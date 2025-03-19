import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Create Context
const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const location = useLocation();
  const [playMusic, setPlayMusic] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const [nonHome, setNonHome] = useState(false);
  const [switching, setSwitching] = useState(false)
  const [path, setPath] = useState("");
  const [footer, setFooter] = useState(false);
  const [pastPoint, setPastPoint] = useState(false);


  useEffect(() => {
    setPath(location.pathname);
    setSwitching(false);
    setNonHome(location.pathname !== "/"); 
  }, [location.pathname]);

  return (
    <NavContext.Provider value={{
      nonHome, setNonHome,
      playMusic, setPlayMusic,
      animationDone, setAnimationDone,
      switching, setSwitching,
      path, setPath,
      footer, setFooter,
      pastPoint, setPastPoint
    }}>
      {children}
    </NavContext.Provider>
  );
};

// Custom Hook to use the context in any component
export const useNav = () => useContext(NavContext);

