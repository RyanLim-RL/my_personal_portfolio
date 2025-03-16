import Agent from "./agent";

class Slime_Simulation {
    constructor(width, height) {
        this.NUM_AGENTS = 100000;
        this.DECAY_RATE = 0.1;
        this.DECAY_RATE_MOUSE = 0.2;
        this.agents = [];
        this.trail = new Float32Array(width * height);
        this.width = width;
        this.height = height;
        this.mouseSense = 1000;
    }
    initialize() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const spawnRadius = Math.min(this.width, this.height) * 0.5; 

        for (let i = 0; i < this.NUM_AGENTS; i++) {
            const randomAngle = Math.random() * Math.PI * 2; 
            const radius = Math.sqrt(Math.random()) * spawnRadius; // Even distribution
            const x = centerX + Math.cos(randomAngle) * radius;
            const y = centerY + Math.sin(randomAngle) * radius;

            const angle = Math.atan2(centerY - y, centerX - x);

            this.agents.push(new Agent(angle, x, y));
        }
    }
    update(mX, mY, mActive) {
        const mouseRadiusSq = this.mouseSense ** 2;
        for (let i = 0; i < this.trail.length; i++) {
            if (this.trail[i] < 0.01) continue;
            this.convergeNorm(i, mX, mY, mouseRadiusSq);
        }

        for (let i = 0; i < this.agents.length; i++) {
            this.agents[i].move(this.width, this.height, mActive, mX, mY, this.trail);
        }
    }
    convergeFast(i) {
        this.trail[i] *= 1 - 0.4;
    }
    convergeNorm(i, mX, mY, mouseRadiusSq) {
        const x = i % this.width;
        const y = Math.floor(i / this.width);

        const dx = x - mX;
        const dy = y - mY;
        const distanceSq = dx * dx + dy * dy;

        this.trail[i] *= 1 - (distanceSq < mouseRadiusSq ? this.DECAY_RATE_MOUSE : this.DECAY_RATE);
    }
    getTrail() {
        return this.trail;
    }
}

export default Slime_Simulation;



