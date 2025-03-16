import { useRef, useEffect, useState } from 'react';
import '../../styles/home_styles/footer.css';
import Paddle from '../../utils/paddle_game/main.js';
import { useNavigate } from "react-router-dom"
import { useNav } from "../../contexts/navcontext";


const Footer = () => {
    const { setSwitching, switching } = useNav();
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const footerRef = useRef(null);
    const animationRef = useRef(null);
    const paddleRef = useRef(null);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });
    const [scorePlayer1, setScorePlayer1] = useState(0);
    const [scorePlayer2, setScorePlayer2] = useState(0);

    useEffect(() => {
        const resizeHandler = () => {

            setDimensions({
                width: footerRef.current.offsetWidth,
                height: window.innerHeight / 1.1
            });
        }
        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    useEffect(() => {
        if (!footerRef.current) return
        setDimensions({
            width: footerRef.current.offsetWidth,
            height: window.innerHeight / 1.1
        });
    }, []);

    useEffect(() => {
        if (!isGameRunning) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        paddleRef.current = new Paddle(dimensions.width, dimensions.height);

        function draw() {
            ctx.clearRect(0, 0, paddleRef.current.width, paddleRef.current.height);

            // Draw Paddles
            ctx.fillStyle = "black";
            ctx.fillRect(10, paddleRef.current.paddle1Y, paddleRef.current.paddleWidth, paddleRef.current.paddleHeight);
            ctx.fillRect(paddleRef.current.width - 20, paddleRef.current.paddle2Y, paddleRef.current.paddleWidth, paddleRef.current.paddleHeight);

            // Draw Ball
            ctx.beginPath();
            ctx.arc(paddleRef.current.ballX, paddleRef.current.ballY, 8, 0, Math.PI * 2);
            ctx.fillStyle = "black";
            ctx.fill();

            if (paddleRef.current.checkEnd()) {
                ctx.clearRect(0, 0, paddleRef.current.width, paddleRef.current.height);
                return;
            }

            paddleRef.current.update();


            setScorePlayer1(paddleRef.current.getScorePlayer1());
            setScorePlayer2(paddleRef.current.getScorePlayer2());

            animationRef.current = requestAnimationFrame(draw);
        }
        draw();

        return () => cancelAnimationFrame(animationRef.current);
    }, [dimensions, isGameRunning]);



    useEffect(() => {
        const canvas = canvasRef.current;

        const handleKeyDown = (e) => {
            if (!paddleRef.current) return;
            if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "w" || e.key === "s") {
                e.preventDefault();
            }
            if (e.key === "ArrowUp" || e.key === "w") paddleRef.current.upPressed = true;
            if (e.key === "ArrowDown" || e.key === "s") paddleRef.current.downPressed = true;
        };

        const handleKeyUp = (e) => {
            if (!paddleRef.current) return;
            if (e.key === "ArrowUp" || e.key === "w") paddleRef.current.upPressed = false;
            if (e.key === "ArrowDown" || e.key === "s") paddleRef.current.downPressed = false
        };

        const handleClick = () => {
            canvas.focus();
        };

        // Make canvas focusable
        canvas.setAttribute("tabindex", "0");

        // Attach event listeners
        canvas.addEventListener("keydown", handleKeyDown);
        canvas.addEventListener("keyup", handleKeyUp);
        canvas.addEventListener("click", handleClick);

        // Cleanup on unmount
        return () => {
            canvas.removeEventListener("keydown", handleKeyDown);
            canvas.removeEventListener("keyup", handleKeyUp);
            canvas.removeEventListener("click", handleClick);
        };
    }, []);

    useEffect(() => {
        if (scorePlayer1 >= 5) {
            setTimeout(() => {
                setIsGameRunning(false);
            }, 1500);
        } else if (scorePlayer2 >= 5) {
            setTimeout(() => {
                setIsGameRunning(false);
            }, 1500);
        }
    }, [scorePlayer1, scorePlayer2]);

    const handleClick = (path_in) => {
        if (switching) return;
        setSwitching(true);
        setTimeout(() => {
            navigate(path_in);
        }, 1500);
    };

    const handleGameStart = () => {
        setIsGameRunning(true);
        setScorePlayer1(0);
        setScorePlayer2(0);
        if (canvasRef.current) {
            canvasRef.current.focus();
        }
    };
    const copyEmail = () => {
        const email = "ryanlim.ryml@gmail.com"
        navigator.clipboard.writeText(email);
        const copied = document.querySelector('.copied-footer');
        if (!copied) return;

        copied.style.transform = "translateX(0)";
        copied.style.opacity = 1;
        setTimeout(() => {
            copied.style.opacity = 0;
            copied.style.transform = "translateX(100%)";
        }, 2000);
    };


    return (
        <footer className='footer-container'>
            <div className="container-text-foot" ref={footerRef}>
                <div className="footer-bottom">
                    <div className="footer-left">
                        <div><p className='left-foot-text'>Where innovation <br></br>meets reality</p></div>
                        <div className="footer-page">
                            <p>Explore</p>
                            <div className='footer-page-container'>
                                <div className='footer-page-left'>
                                    <div onClick={() => handleClick("/")}> Home</div>
                                    <div onClick={() => handleClick("/about")}> About</div>
                                </div>
                                <div className='footer-page-right'>
                                    <div onClick={() => handleClick("/projects")}> Projects</div>
                                    <div onClick={() => handleClick("/contact")}> Contact</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-right">
                        <div className="footer-social">
                            <p>Connect</p>
                            <div className="social-icons">
                                <div className="social-icons-left">
                                    <a href="https://www.linkedin.com/in/ryan-lim-26baa7295/" className='social-icons-link'>
                                        <img id="linkedin-footer" src={process.env.PUBLIC_URL + "/find_me_icons/linkedin.svg"} alt="linkedin">
                                        </img>
                                        <div className='icon-name-foot'>Linkedin</div>
                                    </a>
                                    <a href="https://github.com/RyanLim-RL" className='social-icons-link'>
                                        <img id="github-footer" src={process.env.PUBLIC_URL + "/find_me_icons/github.svg"} alt="github">
                                        </img>
                                        <div className='icon-name-foot'> Github</div>
                                    </a>
                                    <a href="https://medium.com/@ryanlim.ryml" className='social-icons-link'>
                                        <img id="medium-footer" src={process.env.PUBLIC_URL + "/find_me_icons/medium.svg"} alt="medium">
                                        </img>
                                        <div className='icon-name-foot'>Medium</div>
                                    </a>
                                </div>
                                <div className="social-icons-right">
                                    <a href="https://discordapp.com/users/314766465477640193" className='social-icons-link'>
                                        <img id="discord-footer" src={process.env.PUBLIC_URL + "/find_me_icons/discord.svg"} alt="discord">
                                        </img>
                                        <div className='icon-name-foot'>Discord</div>
                                    </a>
                                    <a href="https://leetcode.com/u/Ryan_Lim/" className='social-icons-link'>
                                        <img id="leetcode-footer" src={process.env.PUBLIC_URL + "/find_me_icons/leetcode.svg"} alt="leetcode">
                                        </img>
                                        <div className='icon-name-foot'>Leetcode</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='email-footer' onClick={copyEmail}>
                            <span>My Email</span>
                            <br></br>
                            ryanlim.ryml@gmail.com
                            <div className='copied-footer'>Copied</div>
                        </div>
                    </div>
                </div>
                <div className="footer-credits">
                    Designed & Built by
                    <br></br>
                    <span>RYAN LIM YI MING</span>
                </div>
            </div>
            <div className="footer-pong">
                <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height}></canvas>
                {isGameRunning && (
                    <div className='score-footer'>
                        <div className='player1-footer'>{scorePlayer1}</div>
                        <div className='player2-footer'>{scorePlayer2}</div>
                    </div>
                )}
                {!isGameRunning && (
                    <div className="footer-pong-start-button" onClick={handleGameStart}>
                        START
                    </div>
                )}
            </div>
            <div className='name-bottom'>
                <div className='name-bottom-left' >RyanLim @2025 - Privacy Policy</div>
                <div className='name-bottom-mid' >Thanks For Visiting</div>
                <div className='name-bottom-right'>United Kingdom, London</div>
            </div>
        </footer>
    );
}

export default Footer;
