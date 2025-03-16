class Paddle {
    constructor(width, height) {
        this.height = height;
        this.width = width;

        this.paddleWidth = 10;
        this.paddleHeight = 140;
        this.paddle1Y = height / 2 - this.paddleHeight / 2;
        this.paddle2Y = height / 2 - this.paddleHeight / 2;
        this.paddleSpeed = 20;

        this.ballX = width / 2;
        this.ballY = height / 2;
        this.ballSpeedX = 20;
        this.ballSpeedY = 3;

        this.upPressed = false;
        this.downPressed = false;

        this.scorePlayer1 = 0;
        this.scorePlayer2 = 0;
        this.hit = false;
    }
    reset() {
        this.scorePlayer1 = 0;
        this.scorePlayer2 = 0;
        this.ballSpeedX = 20;
        this.ballSpeedY = 3;
        this.paddleSpeed = 20;
    }
    update() {
        this.hit = false;

        if (this.upPressed) this.paddle1Y = Math.max(0, this.paddle1Y - this.paddleSpeed);
        if (this.downPressed) this.paddle1Y = Math.min(this.height - this.paddleHeight, this.paddle1Y + this.paddleSpeed);

        if (this.paddle2Y + this.paddleHeight / 2 < this.ballY) this.paddle2Y += this.paddleSpeed / 1.5;
        if (this.paddle2Y + this.paddleHeight / 2 > this.ballY) this.paddle2Y -= this.paddleSpeed / 1.5;

        
        this.ballX += this.ballSpeedX;
        this.ballY += this.ballSpeedY;

        if (this.ballY <= 0 || this.ballY >= this.height) this.ballSpeedY *= -1;
        
        if (this.ballX <= 30 && this.ballY > this.paddle1Y && this.ballY < this.paddle1Y + this.paddleHeight) {
            this.ballSpeedX *= -1;
            let distanceFromCenter = (this.ballY - (this.paddle1Y + this.paddleHeight / 2)) / (this.paddleHeight / 2);
            this.ballSpeedY += distanceFromCenter * 10;
            if (Math.abs(this.ballSpeedX) < 35) {
                this.ballSpeedX *= 1.2;
                this.paddleSpeed *= 1.2;
            }
            this.hit = true;
        }
        
        if (this.ballX >= this.width - 30 && this.ballY > this.paddle2Y && this.ballY < this.paddle2Y + this.paddleHeight) {
            this.ballSpeedX *= -1;
            let distanceFromCenter = (this.ballY - (this.paddle2Y + this.paddleHeight / 2)) / (this.paddleHeight / 2);
            this.ballSpeedY += distanceFromCenter * 10;
            if (Math.abs(this.ballSpeedX) < 35) {
                this.ballSpeedX *= 1.2;
                this.paddleSpeed *= 1.2;
            }
            this.hit = true;
        }
    
        if ((this.ballX < 0 || this.ballX > this.width) && this.hit === false) {
            if (this.ballX < 0) this.scorePlayer2++;
            if (this.ballX > this.width) this.scorePlayer1++;
            this.ballX = this.width / 2;
            this.ballY = this.height / 2;
            if (this.ballSpeedX < 0) {
                this.ballSpeedX = 20;
            } else {
                this.ballSpeedX = -20;
            }
            this.paddleSpeed = 20;


        }
    }
    getScorePlayer1() {
        return this.scorePlayer1;
    }
    getScorePlayer2() {
        return this.scorePlayer2;
    }
    checkEnd() {
        return this.scorePlayer1 === 5 || this.scorePlayer2 === 5;
    }
}

export default Paddle;
