import { useEffect, useRef, useState } from "react";
import Slime_Simulation from "../../utils/slime_simulation/simulation";
import "../../styles/contact_styles/slime.css";

const Slime = () => {
    const mousePos = useRef({ x: 0, y: 0 });
    const mouseActive = useRef(false);
    const workerRef = useRef(null);
    const animationRef = useRef(null);
    const Slime_SimulationRef = useRef(null);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const mouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            mouseActive.current = true;
        }
        const isMouseInactive = () => {
            mouseActive.current = false;
        }
        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseleave", isMouseInactive);
        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseleave", isMouseInactive);
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        workerRef.current = new Worker(new URL("../../workers/slimeWorker.worker.js", import.meta.url));
        const canvas = Slime_SimulationRef.current;
        const ctx = canvas.getContext("2d");
        const imageData = ctx.createImageData(dimensions.width, dimensions.height);

        workerRef.current.postMessage({ type: "INIT", data: { dimensions } });

        const draw = () => {
            if (!workerRef.current) return;
            workerRef.current.postMessage({ type: "UPDATE", data: { mousePosition: mousePos.current, mouseActive: mouseActive.current } });
        }

        workerRef.current.onmessage = (e) => {
            if (e.data.type === "RENDER") {
                for (let i = 0; i < e.data.trail.length; i++) {
                    if (e.data.trail[i] === 0) {
                        imageData.data[i * 4 + 0] = 204; // Red
                        imageData.data[i * 4 + 1] = 204; // Green
                        imageData.data[i * 4 + 2] = 255; // Blue
                        imageData.data[i * 4 + 3] = 255;
                    } else {
                        const brightnessR = Math.max(204 - e.data.trail[i] * 20, 0);
                        const brightnessG = Math.max(204 - e.data.trail[i] * 20, 0);
                        const brightnessB = Math.max(255 - e.data.trail[i] * 20, 0);
                        imageData.data[i * 4 + 0] = brightnessR; // Red
                        imageData.data[i * 4 + 1] = brightnessG; // Green
                        imageData.data[i * 4 + 2] = brightnessB; // Blue
                        imageData.data[i * 4 + 3] = 255;
                    }

                }
                ctx.putImageData(imageData, 0, 0);

                animationRef.current = requestAnimationFrame(draw);

            } else if (e.data.type === "READY") {
                animationRef.current = requestAnimationFrame(draw);
            }
        }
        return () => {
            cancelAnimationFrame(animationRef.current);
            workerRef.current.terminate();
            workerRef.current = null;
        }
    }, [dimensions]);

    return (
        <div className="slime">
            <canvas ref={Slime_SimulationRef} id="slime" width={dimensions.width} height={dimensions.height} />
        </div>
    );
}

export default Slime;
