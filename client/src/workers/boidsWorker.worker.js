/* eslint-disable no-restricted-globals */
import Boids_simulation_algorithm from "../utils/boids/main.js";
import Ripples from "../utils/boids/ripple.js";

let ripples;
let simulation = [];
let finished = false;

self.onmessage = function (e) {
    const { type, data } = e.data;

    if (type === "INIT" && !finished) {
        const { dimensions } = data;
        simulation = new Boids_simulation_algorithm(dimensions);
        ripples = new Ripples();
        self.postMessage({ type: "RENDER", boids: simulation.getBoids(), ripples: ripples.getRipples() });
    }

    if (type === "UPDATE" && !finished) {
        const { mousePosition } = data;

        ripples.update();
        simulation.update(mousePosition);
        simulation.getBoids().forEach((b) => {
            b.alpha = Math.min(b.alpha + 0.01, 1);
            ripples.add(b.pos.x, b.pos.y);
        });

        self.postMessage({ type: "RENDER", boids: simulation.getBoids(), ripples: ripples.getRipples() });
    }
    if (type === "DONE" && !finished) {
        self.postMessage({ type: "DONE" });
    }
};
