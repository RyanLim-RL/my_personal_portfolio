import Boid from './boid.js';
import Vector2 from '../vector2.js';
//https://vanhunteradams.com/Pico/Animal_Movement/Boids-algorithm.html

class BoidsSimulation {
    constructor(dimensions) {
        this.width = dimensions.width;
        this.height = dimensions.height;
        this.n = 2500;
        this.biasVal = 0.01;
        this.boids = this.set_up();
        this.magnitude = 10;
        this.visual_range = 25;
        this.protected_ranged_squared = 100;
        this.visual_range_squared = 500;
        this.centering_factor = 0.0001;
        this.matching_factor = 0.05;
        this.avoid_factor = 0.01;
        this.turnfactor = 0.03;
        this.mouse_visual_range_squared = 50;
    }

    set_up() {
        let boids = []
        for (let i = 0; i < this.n; i++) {
            const theta = Math.random() * 2 * Math.PI;
            const random = Math.random() - 0.5;
            const random2 = Math.random() - 0.5;
            const mouseGroup = true;
            const pos = new Vector2(random * this.width, random2 * this.height);
            const vel = new Vector2(Math.cos(theta), Math.sin(theta));
            boids.push(new Boid(pos, vel, this.biasVal, mouseGroup));
        }
        return boids;
    }

    update(mousePosition) {
        for (let boid of this.boids) {
            let pos_avg = new Vector2(0, 0);
            let vel_avg = new Vector2(0, 0);
            let close = new Vector2(0, 0);
            let neighbors = 0;
            for (let other of this.boids) {
                if (boid === other) {
                    continue;
                }
                let diff = boid.pos.subtract(other.pos);
                if (diff.magnitude() < this.visual_range) {
                    let squared_dist = diff.magnitude_squared();
                    if (squared_dist < this.protected_ranged_squared) {
                        close = close.add(boid.pos.subtract(other.pos));
                    } else if (squared_dist < this.visual_range_squared) {
                        pos_avg = pos_avg.add(other.pos);
                        vel_avg = vel_avg.add(other.vel);
                        neighbors += 1;
                    }
                }
            }
            let acc = new Vector2(0, 0);
            if (neighbors > 0) {
                pos_avg = pos_avg.divide(neighbors);
                vel_avg = vel_avg.divide(neighbors);
                acc = pos_avg.subtract(boid.pos).multiply(this.centering_factor).add(vel_avg.subtract(boid.vel).multiply(this.matching_factor))
            }
            acc = acc.add(close.multiply(this.avoid_factor));
            if (boid.pos.y > this.height / 3) {
                acc = acc.add(new Vector2(0, -this.turnfactor));
            }
            if (boid.pos.y < -this.height / 3) {
                acc = acc.add(new Vector2(0, this.turnfactor));
            }
            if (boid.pos.x > this.width / 3) {
                acc = acc.add(new Vector2(-this.turnfactor, 0));
            }
            if (boid.pos.x < -this.width / 3) {
                acc = acc.add(new Vector2(this.turnfactor, 0));
            }

            let mousePositionVector = new Vector2(mousePosition.x - this.width / 2, (mousePosition.y - this.height / 2));
            if (boid.mouseGroup && mousePositionVector.subtract(boid.pos).magnitude() < this.mouse_visual_range_squared) {
                acc = acc.add(mousePositionVector.subtract(boid.pos).multiply(boid.biasVal));
            }

            boid.acc = acc;

            boid.update(2);
        }
    }

    getBoids() {
        return this.boids;
    }
}




export default BoidsSimulation;