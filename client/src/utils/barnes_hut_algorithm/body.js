import Vector2 from "../vector2";
class Body {
    constructor(pos, vel, mass, mouse = false) {
        this.pos = pos;
        this.vel = vel;
        this.acc = new Vector2(0, 0);
        this.mass = mass;
        this.alpha = 0.0;
        this.mouse = mouse;
    }
    update(dt) {
        this.vel = this.vel.add(this.acc.multiply(dt));
        this.pos = this.pos.add(this.vel.multiply(dt));
        this.acc = new Vector2(0, 0);
    };
};
export default Body;