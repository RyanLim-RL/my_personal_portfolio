
import { useEffect, useState, useRef } from 'react';
import { useNav } from "../../contexts/navcontext";
import '../../styles/projects_styles/projects.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { projects } from './projects_data';
import { playClick } from '../click';
import AutoScroll from './auto_scroll';

const Projects = () => {
    const { setNonHome, setSwitching, switching, path, playMusic } = useNav();
    const location = useLocation();
    const [projectFocused, setProjectFocused] = useState([0, 0]);
    const navigate = useNavigate();
    const lastFocusedIndex = useRef(null);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768); // Adjust breakpoint as needed

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 867);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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

    useEffect(() => {
        const scrollHandler = () => {

            const projectPageWrapper = document.querySelector('.projects-page-wrapper');
            const containerRelative = document.querySelector('.projects-container-relative');
            const percentageScrolled = projectPageWrapper.scrollTop /
                (containerRelative.clientHeight - window.innerHeight);
            if (percentageScrolled < 0.19) {
                projectPageWrapper.scrollTo(0, 0.66 * (containerRelative.clientHeight - window.innerHeight));

            } else if (percentageScrolled > 0.71)
                projectPageWrapper.scrollTo(0, 0.235 * (containerRelative.clientHeight - window.innerHeight));
        }
        const wrapper = document.querySelector('.projects-page-wrapper');
        wrapper.addEventListener('scroll', scrollHandler);
        return () => wrapper.removeEventListener('scroll', scrollHandler);
    }, []);

    useEffect(() => {
        const projectPageWrapper = document.querySelector('.projects-page-wrapper');
        const containerRelative = document.querySelector('.projects-container-relative');
        projectPageWrapper.scrollTo(0, 0.235 * (containerRelative.clientHeight - window.innerHeight));
    }, []);

    const debounceTimeout = useRef(null);
    useEffect(() => {
        const projectPageWrapper = document.querySelector('.projects-page-wrapper');
        const containerRelative = document.querySelector('.projects-container-relative');
        const projectsList = document.querySelectorAll('.proj-item-page');
        const lengthProjects = projectsList.length;
        const staggerFactor = 0.83;

        const scrollHandler = () => {
            const percentageScrolled = projectPageWrapper.scrollTop /
                (containerRelative.clientHeight - window.innerHeight);

            projectsList.forEach((proj, index) => {
                const start = index * (staggerFactor / (lengthProjects - 1));
                const end = start + (1 - staggerFactor);


                let progress = (percentageScrolled - start) / (end - start);
                progress = Math.max(0, Math.min(1, progress));
                if (progress < 0.3 && progress > 0.01 && lastFocusedIndex.current !== index) {
                    lastFocusedIndex.current = index;

                    // Clear any previous debounce to prevent race conditions
                    clearTimeout(debounceTimeout.current);

                    // Set a debounce (e.g., 100ms) before updating project focus
                    debounceTimeout.current = setTimeout(() => {
                        setProjectFocused(prev => [prev[1], index]);
                    }, 100);

                }
                if (progress < 0.3) {
                    proj.style.transform = `translateY(-${progress * 2 * 100}%)`;
                } else {
                    proj.style.transform = `translateY(-${(0.6 + (progress - 0.3) / 0.7 * 0.4) * 100}%)`;
                }
                if (progress >= 0.3) {

                    proj.style.transform += ` scale(${1 - (progress - 0.3)})`;
                }
                if (progress > 0.95) {
                    proj.style.opacity = 1 - (progress - 0.95) / 0.05;
                } else {
                    proj.style.opacity = 1;
                }
            });
        };
        projectPageWrapper.addEventListener('scroll', scrollHandler);
        return () => projectPageWrapper.removeEventListener('scroll', scrollHandler);
    }, []);

    useEffect(() => {

        const stickyHeader = document.querySelector('.projects-header-stiky');
        const projectHeader = document.querySelector('.projects-header');
        const techProjPage = document.querySelector('.tech-proj-page');
        const desProjPage = document.querySelector('.description-proj-page');
        if (!switching) {
            playClick(playMusic);
        }
        if (projectFocused[1] === 4) {
            stickyHeader.style.backgroundColor = 'rgb(57, 0, 149)';
            projectHeader.style.color = 'white';
            techProjPage.style.borderLeft = '1px solid white';
            desProjPage.style.borderRight = '1px solid white';

        } else if (projectFocused[1] === 5) {
            stickyHeader.style.backgroundColor = 'rgb(247, 178, 59)';
            projectHeader.style.color = 'black';
            techProjPage.style.borderLeft = '1px solid black';
            desProjPage.style.borderRight = '1px solid black';

        }
        else if (projectFocused[1] === 6) {
            stickyHeader.style.backgroundColor = 'rgb(61, 135, 119)';
            projectHeader.style.color = 'rgb(247, 178, 59)';
            techProjPage.style.borderLeft = '1px solid rgb(247, 178, 59)';
            desProjPage.style.borderRight = '1px solid rgb(247, 178, 59)';
        }
        else if (projectFocused[1] === 7) {
            stickyHeader.style.backgroundColor = 'rgb(157, 157, 240)';
            projectHeader.style.color = 'rgb(50, 50, 243)';
            techProjPage.style.borderLeft = '1px solid rgb(50, 50, 243)';
            desProjPage.style.borderRight = '1px solid rgb(50, 50, 243)';

        }
        else if (projectFocused[1] === 8) {
            stickyHeader.style.backgroundColor = 'rgb(61, 135, 119)';
            projectHeader.style.color = 'rgb(247, 178, 59)';
            techProjPage.style.borderLeft = '1px solid rgb(247, 178, 59)';
            desProjPage.style.borderRight = '1px solid rgb(247, 178, 59)';

        }
        else if (projectFocused[1] === 9) {
            stickyHeader.style.backgroundColor = 'rgb(157, 157, 240)';
            projectHeader.style.color = 'rgb(50, 50, 243)';
            techProjPage.style.borderLeft = '1px solid rgb(50, 50, 243)';
            desProjPage.style.borderRight = '1px solid rgb(50, 50, 243)';

        }
        else if (projectFocused[1] === 10) {
            stickyHeader.style.backgroundColor = 'rgb(57, 0, 149)';
            projectHeader.style.color = 'white';
            techProjPage.style.borderLeft = '1px solid white';
            desProjPage.style.borderRight = '1px solid white';

        }
        else if (projectFocused[1] === 11) {
            stickyHeader.style.backgroundColor = 'rgb(247, 178, 59)';
            projectHeader.style.color = 'black';
            techProjPage.style.borderLeft = '1px solid black';
            desProjPage.style.borderRight = '1px solid black';

        }
        else if (projectFocused[1] === 12) {
            stickyHeader.style.backgroundColor = 'rgb(61, 135, 119)';
            projectHeader.style.color = 'rgb(247, 178, 59)';
            techProjPage.style.borderLeft = '1px solid rgb(247, 178, 59)';
            desProjPage.style.borderRight = '1px solid rgb(247, 178, 59)';

        }
        else if (projectFocused[1] === 13) {
            stickyHeader.style.backgroundColor = 'rgb(157, 157, 240)';
            projectHeader.style.color = 'rgb(50, 50, 243)';
            techProjPage.style.borderLeft = '1px solid rgb(50, 50, 243)';
            desProjPage.style.borderRight = '1px solid rgb(50, 50, 243)';
        } else if (projectFocused[1] === 14) {
            stickyHeader.style.backgroundColor = 'rgb(61, 135, 119)';
            projectHeader.style.color = 'rgb(247, 178, 59)';
            techProjPage.style.borderLeft = '1px solid rgb(247, 178, 59)';
            desProjPage.style.borderRight = '1px solid rgb(247, 178, 59)';
        }
    }, [projectFocused, switching]);

    useEffect(() => {
        const prevProjects = document.querySelector(`.proj-item-page[data-key="${projectFocused[0]}"]`);
        prevProjects.style.backgroundColor = 'rgb(245, 150, 99)';
        const specificProject = document.querySelector(`.proj-item-page[data-key="${projectFocused[1]}"]`);
        specificProject.style.backgroundColor = 'rgb(255, 255, 255)';
    }, [projectFocused]);




    return (
        <div className="projects-page-wrapper">
            <AutoScroll />
            <div className='projects-container-relative'>
                <div className="projects-header-stiky">
                    <div className='projects-header'>
                        {isSmallScreen ? (
                            <>
                                <div className="title-proj-page">{projects[projectFocused[1]].name}</div>
                                <div className="wrapper-proj-header">
                                    <div className="tech-proj-page">{projects[projectFocused[1]].tech}</div>
                                    <div className="description-proj-page">{projects[projectFocused[1]].description}</div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="tech-proj-page">{projects[projectFocused[1]].tech}</div>
                                <div className="title-proj-page">{projects[projectFocused[1]].name}</div>
                                <div className="description-proj-page">{projects[projectFocused[1]].description}</div>
                            </>
                        )}
                    </div>
                    <div className="projects-container">
                        {projects.map((proj, index) => (
                            <a
                                key={index}
                                className="proj-item-page"
                                data-key={index}
                                href={proj.githubLink}
                                target="_blank"
                                rel="noopener noreferrer" // Security best practice
                            >
                                <img src={proj.img} alt={proj.name} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;