import Vector2 from "../vector2";

class Ball {
    constructor(pos, vel, radius, imgSrc, particleView) {
        this.pos = pos
        this.vel = vel
        this.radius = radius;
        this.image = new Image();
        this.image.src = imgSrc;
        this.isDragging = false;
        this.alpha = particleView ? 1 : 0;
    }

    update() {
        this.pos = this.pos.add(this.vel);
    }

    checkOutOfBounds(width, height) {
        const x = this.pos.x;
        const y = this.pos.y;
        if (x + this.radius > width || x - this.radius < 0) {
            this.vel.x *= -1
        }
        if (y + this.radius > height || y - this.radius < 0) {
            this.vel.y *= -1
        }
    }
    isMouseOver(mx, my) {
        let mouseV = new Vector2(mx, my)
        return mouseV.subtract(this.pos).magnitude() < this.radius;
    }
}

class Balls {
    constructor(images, width, height, particleView) {
        this.balls = [];
        let radius;
        if (width < 500) {
            radius = 30;
        } else if (width < 1000) {
            radius = 40;
        } else if (width < 1500) {
            radius = 50;
        } else {
            radius = 60;
        }

        for (let i = 0; i < images.length; i++) {
            let x, y, pos;

            let attempts = 0;
            const maxAttempts = 100;
            do {
                x = Math.random() * (width - radius * 2) + radius;
                y = Math.random() * (height - radius * 2) + radius;
                pos = new Vector2(x, y);
                attempts++;
                if (attempts > maxAttempts) {
                    console.warn("Max attempts reached for non-overlapping placement.");
                    break;
                }
            } while (this.isOverlapping(pos, radius));
            const vel = new Vector2((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5);
            this.balls.push(new Ball(pos, vel, radius, images[i][0], particleView));
        }

    }

    isOverlapping(pos, radius) {
        for (let ball of this.balls) {
            if (ball.pos.subtract(pos).magnitude() < ball.radius + radius) {
                return true;
            }
        }
        return false;
    }

    handleCollisions() {
        for (let i = 0; i < this.balls.length; i++) {
            for (let j = i + 1; j < this.balls.length; j++) {
                let ball1 = this.balls[i];
                let ball2 = this.balls[j];
                if (ball1.pos.subtract(ball2.pos).magnitude() >= ball1.radius + ball2.radius) continue;

                let tempvel = ball1.vel;
                ball1.vel = ball2.vel;
                ball2.vel = tempvel
            }
        }
    }
    getBalls() {
        return this.balls
    }
}

class Simulation {
    constructor(dimensions, images, particleView) {
        this.width = dimensions.width;
        this.height = dimensions.height;
        this.balls = new Balls(images, this.width, this.height, particleView);
        this.draggedBall = null;
    }
    update() {
        this.balls.getBalls().forEach(ball => {
            ball.update();
            ball.checkOutOfBounds(this.width, this.height);
        });
        this.balls.handleCollisions();
    }
    click(mouseX, mouseY) {
        for (let ball of this.balls.getBalls()) {
            if (ball.isMouseOver(mouseX, mouseY)) {
                ball.isDragging = true;
                ball.vel = new Vector2(0, 0);
                this.draggedBall = ball;
                break;
            }
        }

    }
    drag(x, y) {
        if (this.draggedBall) {
            this.draggedBall.pos = new Vector2(x, y);
        }
    }
    lift() {
        if (this.draggedBall) {
            this.draggedBall.isDragging = false;
            this.draggedBall.vel = new Vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);
            this.draggedBall = null;
        }
    }
    fadeOut() {
        this.balls.getBalls().forEach(ball => {
            ball.alpha = Math.max(ball.alpha - 0.05, 0);
        });
    }
    fadeIn() {
        this.balls.getBalls().forEach(ball => {
            ball.alpha = Math.min(ball.alpha + 0.05, 1);
        });
    }

}

export default Simulation;