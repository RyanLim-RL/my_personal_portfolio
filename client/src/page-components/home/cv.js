import { FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import { RiArrowGoBackLine,RiLoopLeftFill } from "react-icons/ri";



import { useEffect, useState, useRef } from "react";
import { useNav } from "../../contexts/navcontext";
import Conway_Game_Of_Life from "../../utils/conway_game_life/main.js";
import "../../styles/home_styles/cv.css";

const CV = () => {
    const { setCVView } = useNav();
    const [cvOpen, setCvOpen] = useState(false);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const timeoutRef = useRef(null);
    const golRef = useRef(null);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const handleClickView = () => {
        setCvOpen(prev => !prev);
        setCVView(prev => !prev);
    };
    const restartClick = () => {
        const loopIcon = document.querySelector(".loop-icon-cv");
        if (loopIcon.classList.contains("loop-icon-cv-rotate")) return;
        loopIcon.classList.add("loop-icon-cv-rotate");
        golRef.current.init();
        setTimeout(() => {
            loopIcon.classList.remove("loop-icon-cv-rotate");
        }, 500);
    }

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    //improve to nlogn time complexity from n2 next time
    useEffect(() => {
        if (cvOpen) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, dimensions.width, dimensions.height);
            golRef.current = new Conway_Game_Of_Life(dimensions.width, dimensions.height, 6);
            let opacity = 0;

            const animate = () => {
                opacity += 0.03;
                golRef.current.update();
                ctx.clearRect(0, 0, dimensions.width, dimensions.height);
                for (let i = 0; i < golRef.current.cols; i++) {
                    for (let j = 0; j < golRef.current.rows; j++) {
                        const x = i * golRef.current.cellSize;
                        const y = j * golRef.current.cellSize;
                        if (golRef.current.grid[i][j] === 1) {
                            const hue = (x / dimensions.width) * 40; 
                            opacity = Math.min(1, opacity);
                            ctx.fillStyle = `hsl(${hue}, 100%, 50%,${opacity})`;
                            ctx.fillRect(x, y, golRef.current.cellSize, golRef.current.cellSize);
                        }
                    }
                }
                timeoutRef.current = setTimeout(() => {
                    animationRef.current = requestAnimationFrame(animate);
                }, 1000 / 30);
            }
            animate();
        }
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current); 
        }
    }, [cvOpen, dimensions]);

    useEffect(() => {
        const blockScroll = (e) => {
            if (cvOpen) {
                e.preventDefault();
                e.stopPropagation();
            }
        };
        if (cvOpen) {
            window.addEventListener("wheel", blockScroll, { passive: false, capture: true });
            window.addEventListener("touchmove", blockScroll, { passive: false, capture: true });
        }
        return () => {
            window.removeEventListener("wheel", blockScroll, { passive: false, capture: true });
            window.removeEventListener("touchmove", blockScroll, { passive: false, capture: true });
        };
    }, [cvOpen]);

    return (
        <section className="cv-section">
            <svg className="svg-cv" width="100%" height="100%" viewBox="0 0 1000 500" preserveAspectRatio="none">
                <path className="curvy-line2 not_move2" d="M 1000 250 T 700 200, 0 250" />
            </svg>
            <div className="container-cv">
                <h2 className="cv-section-title">Here's My <span>CV</span></h2>
                <p>Take a look at my professional background and experience.</p>
                <div className="cv-buttons">
                    <a href="/cv/Ryan_Lim_CV.pdf" className="cv-btn download-btn" download>
                        <FaDownload className="cv-icon" /> Download
                    </a>
                    <div className="cv-btn view-btn" onClick={handleClickView}>
                        <FaExternalLinkAlt className="cv-icon" /> View
                    </div>
                </div>
            </div>
            {
                cvOpen && (
                    <div className="cv-view">
                        <canvas ref={canvasRef}
                            className="gol"
                            width={dimensions.width}
                            height={dimensions.height}>
                        </canvas>
                        <div className="cv-view-content">
                            <div className="cv-view-content-inner">
                                <div className="container-title-cv"><h2 className="inner-title-cv-view">Specialised CVs</h2></div>
                                <a href="https://docs.google.com/document/d/1IBlGguXoJ8crMSabVpjZ9I8vvK77iaRmjorCiPkVvoQ/edit?usp=sharing" className="view_link se-link-cv" target="_blank"  rel="noreferrer" >Software Engineer</a>
                                <a href="https://docs.google.com/document/d/1qiyGkdLTSCAg8v0reRO7VlNLYfAa144QrRaE825w_ro/edit?usp=sharing" className="view_link ai-link-cv" target="_blank" rel="noreferrer" >Artificial Intelligence</a>
                                <div className="cv-close" onClick={handleClickView}>
                                    <RiArrowGoBackLine className="cv-icon-view"/>
                                </div>
                                <div className="restart-animation-gol" onClick={restartClick}>
                                    <RiLoopLeftFill className="cv-icon-view loop-icon-cv"/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </section>
    );
};

export default CV;