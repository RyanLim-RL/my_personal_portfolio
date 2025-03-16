import Vector2 from "../vector2"
class Boid {
    constructor(pos, vel, biasVal, mouseGroup) {
        this.pos = pos;
        this.vel = vel;
        this.biasVal = biasVal;
        this.mouseGroup = mouseGroup;
        this.acc = new Vector2(0, 0)
        this.alpha = 0;
    }
    update(dt) {
        this.vel = this.vel.add(this.acc.multiply(dt));
        let vel_mag = this.vel.magnitude();
        if (vel_mag == 0) {
            return;
        }
        this.vel = this.vel.divide(vel_mag);
        this.pos = this.pos.add(this.vel.multiply(dt));
        this.acc = new Vector2(0, 0);
    }
}

export default Boid