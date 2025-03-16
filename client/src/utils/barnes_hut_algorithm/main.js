//http://arborjs.org/docs/barnes-hut
//credits to Deadlock for implementation: https://github.com/DeadlockCode/barnes-hut/tree/master
import Simulation from "./simulation"

class Barnes_Hut_Algorithm {
    constructor(dimensions, navHeight) {
        this.width = dimensions.width;
        this.height = dimensions.height
        this.simulation = new Simulation(this.width, this.height, navHeight);
    }
    update(mousePosition) {
        this.simulation.update(mousePosition);
    }

    getBodies() {
        return this.simulation.getBodies();
    }
    outwards() {
        this.simulation.outwards();
    }
    outOfFrame() {
        return this.simulation.outOfFrame();
    }
    reset() {
        this.simulation.reset();
    }
}
export default Barnes_Hut_Algorithm;
