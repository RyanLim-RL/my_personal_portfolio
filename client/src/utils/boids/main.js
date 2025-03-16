import BoidsSimulation from "./simulation";

class Boids_simulation_algorithm {
    constructor(dimensions) {
        this.simulation = new BoidsSimulation(dimensions);
    }

    update(mousePosition) {
        this.simulation.update(mousePosition);
    }

    getBoids() {
        return this.simulation.getBoids();
    }
}

export default Boids_simulation_algorithm;