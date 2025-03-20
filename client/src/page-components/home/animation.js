import React, { useEffect, useState, useRef } from "react";
import "../../styles/home_styles/animation.css";
import { TbMusicCancel } from "react-icons/tb";
import { useNav } from "../../contexts/navcontext";

const Animation = () => {
    const { setPlayMusic, setAnimationDone } = useNav();
    const mousePosition = useRef({ x: 0, y: 0 });
    const canvasRef = useRef(null);
    const workerRef = useRef(null);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const start = () => {
        const nav = document.querySelector(".navbar");
        nav.style.pointerEvents = "auto";
        setPlayMusic(true);
        workerRef.current.postMessage({ type: "DONE", data: { dimensions } });
    }

    const start_no_music = () => {
        setPlayMusic(false);
        const nav = document.querySelector(".navbar");
        nav.style.pointerEvents = "auto";
        workerRef.current.postMessage({ type: "DONE", data: { dimensions } });
    }

    useEffect(() => {
        const resizeHandler = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", resizeHandler);
        return () => {
            window.removeEventListener("resize", resizeHandler);
        }
    }, []);


    useEffect(() => {
        const disableScroll = (e) => {
            e.preventDefault();
        }
        window.addEventListener("wheel", disableScroll, { passive: false, capture: true });
        window.addEventListener("touchmove", disableScroll,{capture: true, passive: false});
        return () => {
            window.removeEventListener("wheel", disableScroll, { passive: false, capture: true });
            window.removeEventListener("touchmove", disableScroll, {capture:true, passive:false});
        }
    }, []);

    useEffect(() => {
        let timeout;
        const getMousePos = (e) => {

            clearTimeout(timeout);
            timeout = setTimeout(() => {
                mousePosition.current = { x: e.clientX, y: e.clientY };
            }, 10);
        };
        window.addEventListener("mousemove", getMousePos);
        return () => window.removeEventListener("mousemove", getMousePos);
    }, []);

    useEffect(() => {
        workerRef.current = new Worker(new URL("../../workers/boidsWorker.worker.js", import.meta.url));
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        workerRef.current.postMessage({ type: "INIT", data: { dimensions } });

        const draw = () => {
            let mouse_position = { x: mousePosition.current.x, y: mousePosition.current.y };
            if (!workerRef.current) return;
            workerRef.current.postMessage({ type: "UPDATE", data: { mousePosition: mouse_position } });
        }


        workerRef.current.onmessage = (e) => {


            if (e.data.type === "RENDER") {
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, dimensions.width, dimensions.height);
                ctx.translate(dimensions.width / 2, dimensions.height / 2);
                ctx.beginPath();
                ctx.globalAlpha = 1;
                ctx.arc(mousePosition.current.x - dimensions.width / 2, mousePosition.current.y - dimensions.height / 2, 3, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(251, 242, 247, 1)";
                ctx.fill();
                ctx.closePath();
                e.data.boids.forEach((b) => {
                    ctx.beginPath();
                    ctx.globalAlpha = b.alpha;
                    ctx.arc(b.pos.x, b.pos.y, 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = "rgb(157, 157, 240)";
                    ctx.fill();
                    ctx.closePath();

                });
                e.data.ripples.forEach((ripple) => {
                    ctx.strokeStyle = `rgb(173, 232, 244, ${ripple.opacity})`;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.closePath();
                });

                requestAnimationFrame(draw);
            } else if (e.data.type === "DONE") {
                const circle = document.getElementsByClassName("circle_explode")[0];
                circle.classList.add("circle_explode_animation");
                setTimeout(() => {
                    setAnimationDone(true);
                }, 1500);
            }
        };
        return () => {
            if (workerRef.current) {
                workerRef.current.terminate();
                workerRef.current = null;
            }
        }

    }, [dimensions]);

    useEffect(() => {
        const nav = document.querySelector(".navbar");
        nav.style.pointerEvents = "none";
    }, []);


    return (
        <div className="animation_wrapper">

            <canvas
                className="boid-canvas"
                ref={canvasRef}
                width={dimensions.width}
                height={dimensions.height}
            ></canvas>
            
            <div className="click_wrapper">
                <div className="circle_explode"></div>
                <div className="click" onClick={start}>
                    <h1 className="click_to_start">Hi, I'm Ryan Lim.</h1>
                    <div className="music-text">This will enable music</div>
                </div>
                <div className="no-sound" onClick={start_no_music}>
                    <TbMusicCancel className="no-sound-icon" />
                    <div className="dropdown">
                        <p>Start without music?</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Animation;
