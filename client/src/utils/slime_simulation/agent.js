class Agent {
    constructor(angle, x, y) {
        this.angle = angle;
        this.x = x;
        this.y = y;

        this.speed = 3;
        this.viewDistance = 24;
        this.ang_sensors = Math.PI / 4;
        this.prevX = x;
        this.prevY = y;
    }

    move(width, height, mActive, mX, mY, trail) {
        this.prevX = this.x;
        this.prevY = this.y;
        const dx = this.x - mX;
        const dy = this.y - mY;
        const distanceSq = dx * dx + dy * dy;

        if (mActive && distanceSq < this.viewDistance ** 2) {
            this.followMouse(dx, dy, distanceSq);
        } else {
            this.followTrail(width, height, trail);
        }

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (!this.solveWrap(width, height)) {
            this.leaveTrail(this.prevX, this.prevY, this.x, this.y, width, trail);
        }
    }

    followMouse(dx, dy, distanceSq) {
        this.speed = 6 + Math.sqrt(distanceSq) * 0.1;
        this.angle = Math.atan2(dy, dx);
    }

    followTrail(width, height, trail) {
        const left = this.sense(width, height, this.angle - this.ang_sensors, trail);
        const forward = this.sense(width, height, this.angle, trail);
        const right = this.sense(width, height, this.angle + this.ang_sensors, trail);

        if (right > forward && right > left) this.angle += this.ang_sensors;
        else if (left > forward && left > right) this.angle -= this.ang_sensors;

        this.speed = 3;
    }

    leaveTrail(x0, y0, x1, y1, width, trail) {
        let dx = x1 - x0;
        let dy = y1 - y0;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let steps = Math.ceil(distance);

        for (let i = 0; i < steps; i++) {
            let t = i / steps;
            let ix = x0 + dx * t;
            let iy = y0 + dy * t;

            let index = Math.floor(iy) * width + Math.floor(ix);
            if (index >= 0 && index < trail.length) {
                trail[index] += 1;
            }
        }
    }

    solveWrap(width, height) {
        let wrap = false;
        if (this.x < 0) {
            this.x += width;
            wrap = true;
        } else if (this.x > width) {
            this.x -= width;
            wrap = true;
        }

        if (this.y < 0) {
            this.y += height;
            wrap = true;
        } else if (this.y > height) {
            this.y -= height;
            wrap = true;
        }

        return wrap;
    }

    sense(width, height, angle, trail) {
        let newX = this.x + Math.cos(angle) * this.viewDistance;
        let newY = this.y + Math.sin(angle) * this.viewDistance;

        if (newX < 0 || newX >= width || newY < 0 || newY >= height) return 0;
        return trail[Math.floor(newY) * width + Math.floor(newX)];
    }
}

export default Agent;