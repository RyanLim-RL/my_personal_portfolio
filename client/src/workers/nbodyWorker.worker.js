/* eslint-disable no-restricted-globals */
import Barnes_Hut_Algorithm from "../utils/barnes_hut_algorithm/main.js";

let simulation = [];
let finished = false;

self.onmessage = function (e) {
    const { type, data } = e.data;

    if (type === "INIT" && !finished) {
        const { dimensions, navHeight } = data;
        simulation = new Barnes_Hut_Algorithm(dimensions, navHeight);
        self.postMessage({ type: "READY" });
    }

    if (type === "UPDATE" && !finished) {
        const { mousePosition } = data;
        simulation.update(mousePosition);
        simulation.getBodies().forEach((b) => b.alpha = Math.min(b.alpha + 0.01, 1));
        if (simulation.outOfFrame()) {
            simulation.reset();
            self.postMessage({ type: "RESET", bodies: simulation.getBodies() });
        } else {
            self.postMessage({ type: "RENDER", bodies: simulation.getBodies() });
        }
    }

    if (type === "EXPLODE") {
        simulation.outwards();
        self.postMessage({ type: "RENDER", bodies: simulation.getBodies() });
    }

};
