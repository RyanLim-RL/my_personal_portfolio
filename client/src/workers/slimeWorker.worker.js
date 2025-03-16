/* eslint-disable no-restricted-globals */
import Slime_Simulation from "../utils/slime_simulation/simulation";

let simulation = [];
let finished = false;

self.onmessage = function (e) {
    const { type, data } = e.data;

    if (type === "INIT" && !finished) {
        const { dimensions } = data;
        simulation = new Slime_Simulation(dimensions.width, dimensions.height);
        simulation.initialize();
        self.postMessage({ type: "READY" });
    }

    if (type === "UPDATE" && !finished) {
        const { mousePosition, mouseActive } = data;
        simulation.update(mousePosition.x, mousePosition.y, mouseActive);
        setTimeout(() => {
            self.postMessage({ type: "RENDER", trail: simulation.getTrail() });
        }, 1000 / 60);
    }
};
