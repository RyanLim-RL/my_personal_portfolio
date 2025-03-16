
import { useEffect } from 'react';
import { useNav } from "../../contexts/navcontext";
import '../../styles/projects_styles/projects.css';
import { useLocation } from 'react-router-dom';

const Projects = () => {
    const { setNonHome, setSwitching, switching, path, setPath } = useNav();
    const location = useLocation();
    useEffect(() => {
        let timeoutIDProjects
        if (location.pathname === path) {
            timeoutIDProjects = setTimeout(() => {
                setSwitching(false);
                setNonHome(true);
            }, 1500);
        }
        return () => clearTimeout(timeoutIDProjects);
    }, [switching]);

    return (
        <div className="scroll-wrapper-projects">
            
        </div>
    );
}

export default Projects;