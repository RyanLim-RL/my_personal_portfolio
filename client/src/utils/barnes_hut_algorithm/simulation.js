import Body from "./body";
import { Quad, Quadtree } from "./quadtree";
import Vector2 from "../vector2";

class Simulation {
    constructor(width, height, navbarHeight) {
        this.width = width;
        this.height = height;
        this.navbarHeight = navbarHeight;

        this.innerRadius = 25.0;
        this.outerRadius = Math.min(this.width, this.height, this.height - (this.navbarHeight)) / 2.0;

        this.n = 10000; // Number of bodies
        this.M = 50000; // Mass of the central body
        this.dt = 0.05;
        this.theta = 1;
        this.epsilon = 1.0;
        this.bodies = this.uniformDisc(this.n);
        this.quadtree = new Quadtree(this.theta, this.epsilon);
    }
    
    uniformDisc(n) {
        let bodies = [];

        const center = new Body(new Vector2(0, 0), new Vector2(0, 0), this.M);
        bodies.push(center);

        while (bodies.length < n) {
            const theta = Math.random() * Math.PI * 2; 
            const sinA = Math.sin(theta);
            const cosA = Math.cos(theta);
            const t = this.innerRadius / this.outerRadius;
            const r = Math.random() * (1.0 - t * t) + t * t;
            const pos = new Vector2(cosA * this.outerRadius * Math.sqrt(r), sinA * this.outerRadius * Math.sqrt(r));

            
            const velocityMagnitude = Math.sqrt(this.M / pos.magnitude()) * 1.2; // 1.2 is a scaling factor for nice effect
            const vel = new Vector2(-sinA * velocityMagnitude, cosA * velocityMagnitude)
            const mass = 1;
            
            bodies.push(new Body(pos, vel, mass));
        }
        return bodies;
    }
    outwards() {
        this.dt = 0.00005;
        this.bodies.forEach((b) => {
            const t = this.innerRadius / this.outerRadius;
            const r = Math.random() * (1.0 - t * t) + t * t;
            b.vel = b.vel.multiply(Math.sqrt(this.M / r));
        });
        this.bodies.sort((a, b) => (a.pos.magnitude_squared() - (b.pos.magnitude_squared())));

        let totalMass = 0.0;
        for (let i = 0; i < this.bodies.length; i++) {
            totalMass += this.bodies[i].mass;
            if (this.bodies[i].mass === 0) {
                continue;
            }

            const v = Math.sqrt(totalMass / (this.bodies[i].pos.magnitude()));
            this.bodies[i].vel = (this.bodies[i].vel.multiply(v));
        }
        this.bodies = this.bodies.filter((b) => b.mass !== this.M);
    }

    update(mousePosition) {
        this.bodies = this.bodies.filter((b) => !b.mouse);
        if (mousePosition) {
            mousePosition.x = (mousePosition.x - this.width / 2);
            mousePosition.y = (mousePosition.y - this.height / 2);
            this.bodies.push(new Body(new Vector2(mousePosition.x, mousePosition.y), new Vector2(0, 0), 3000, true));
        }
        for (let i = 0; i < this.bodies.length; i++) {
            if (this.bodies[i].mass === this.M) {
                continue;
            }
            this.bodies[i].update(this.dt);
        }
        let root_quad = Quad.construct_new_tree(this.bodies);
        this.quadtree.clear(root_quad);

        this.bodies.forEach((b) => {
            this.quadtree.insert(b.pos, b.mass);
        });

        this.quadtree.propogate();

        this.bodies.forEach((b) => {
            b.acc = this.quadtree.acc(b.pos);
        }
        );

    }
    reset() {
        this.dt = 0.05;
        this.bodies = this.uniformDisc(this.n);
    }
    outOfFrame() {
        let count = 0;
        this.bodies.forEach((b) => {
            if (b.pos.x > this.width / 2 || b.pos.x < -this.width / 2 || b.pos.y > this.height / 2 || b.pos.y < -this.height / 2) {
                count++;
            }
        }
        );
        return count > this.bodies.length - 10;
    }
    getBodies() {
        return this.bodies;
    }
}

export default Simulation;