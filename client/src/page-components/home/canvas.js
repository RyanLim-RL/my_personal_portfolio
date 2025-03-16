import React, { useEffect, useRef, useState } from "react";
import "../../styles/home_styles/canvas.css";
import FindMe from "./findme.js";

const NBodyCanvas = () => {
    const canvasRef = useRef(null);
    const workerRef = useRef(null);
    const isScrollListenerActive = useRef(true);
    const isScrollBlocked = useRef(true);
    const animateFinished = useRef(true);
    const animationRef = useRef(null);
    const mousePosition = useRef(null);
    const waitTime = useRef(500);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    useEffect(() => {
        let timeout;
        const getMousePos = (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                mousePosition.current = {
                    x: e.clientX,
                    y: e.clientY,
                };
            }, 10);
        };
        window.addEventListener("mousemove", getMousePos);
        return () => window.removeEventListener("mousemove", getMousePos);
    }, []);


    useEffect(() => {
        const scrollHandler = () => {
            const sectionTop = document.querySelector(".section-top");
            if (!sectionTop) return;
            const rect = sectionTop.getBoundingClientRect();
            const ratio = (window.innerHeight - rect.top) / (window.innerHeight) - 1;
            const scaleVal = Math.max(1 - ratio / 10, 0.97)
            const section_wrapper = document.querySelector(".section-top-wrapper");
            section_wrapper.style.transform = `scale(${scaleVal})`;
            section_wrapper.style.borderRadius = `${Math.min(ratio * 1000, 50)}px`;

        };
        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const blockScroll = (e) => {
            if (isScrollBlocked.current) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        const scrollHandler = () => {
            if (animateFinished.current && isScrollListenerActive.current) {
                workerRef.current.postMessage({ type: "EXPLODE" });
                animateFinished.current = false;
                isScrollListenerActive.current = false;
                setTimeout(() => {
                    isScrollBlocked.current = false;
                }, waitTime.current);
            }
        };
        const resetScrollListener = () => {
            if (window.scrollY === 0 && animateFinished.current) {
                isScrollListenerActive.current = true;
                isScrollBlocked.current = true;
            }
        };

        window.addEventListener("wheel", scrollHandler, { passive: false, capture: true });
        window.addEventListener("wheel", resetScrollListener, { passive: false, capture: true });
        window.addEventListener("wheel", blockScroll, { passive: false, capture: true }); // Block desktop scroll
        window.addEventListener("touchmove", blockScroll, { passive: false, capture: true }); // Block mobile scroll
        return () => {
            window.removeEventListener("wheel", scrollHandler, { passive: false, capture: true });
            window.removeEventListener("wheel", resetScrollListener, { passive: false, capture: true });
            window.removeEventListener("wheel", blockScroll, { passive: false, capture: true });
            window.removeEventListener("touchmove", blockScroll, { passive: false, capture: true });
        };
    }, []);

    useEffect(() => {
        workerRef.current = new Worker(new URL("../../workers/nbodyWorker.worker.js", import.meta.url));
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        workerRef.current.postMessage({ type: "INIT", data: { dimensions, navHeight } });

        const draw = () => {
            if (!workerRef.current) return;
            workerRef.current.postMessage({ type: "UPDATE", data: { mousePosition: mousePosition.current } });
        }
        workerRef.current.onmessage = (e) => {
            if (e.data.type === "RENDER") {
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, dimensions.width, dimensions.height);
                ctx.translate(dimensions.width / 2, dimensions.height / 2);
                e.data.bodies.forEach((b) => {
                    ctx.beginPath();
                    ctx.globalAlpha = b.alpha;
                    ctx.arc(b.pos.x, b.pos.y, 1, 0, Math.PI * 2);
                    ctx.fillStyle = "#b8acab";
                    ctx.fill();
                    ctx.closePath();
                });
                animationRef.current = requestAnimationFrame(draw);
            } else if (e.data.type === "READY") {
                animationRef.current = requestAnimationFrame(draw);
            } else if (e.data.type === "RESET") {
                animateFinished.current = true;
                animationRef.current = requestAnimationFrame(draw);
            }
        };
        return () => {
            if (workerRef.current) {
                cancelAnimationFrame(animationRef.current);
                workerRef.current.terminate();
                workerRef.current = null;
            }
        };
    }, [dimensions]);

    return (
        <div className="section-top">
            <div className="section-top-wrapper">
                <canvas
                    className="nbody-canvas"
                    ref={canvasRef}
                    width={dimensions.width}
                    height={dimensions.height}
                ></canvas>
                <div className="title">
                    <p className="line1">CS Graduate Specialized in AI</p>
                    <p className="line2">SOFTWARE DEVELOPER</p>
                    <p className="line3">Maths & Physics Enthusiast ✮</p>
                </div>
                <FindMe />
            </div>
        </div>
    );
};

export default NBodyCanvas;