class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(other) {
        return new Vector2(this.x + other.x, this.y + other.y)
    }
    subtract(other) {
        return new Vector2(this.x - other.x, this.y - other.y)
    }
    multiply(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar)
    }
    divide(scalar) {
        if (scalar === 0) {
            throw "divide by 0 error"
        }
        return new Vector2(this.x / scalar, this.y / scalar)
    }
    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }
    magnitude_squared() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2)
    }
    theta() {
        return Math.atan2(this.y, this.x)
    }
    equals(other) {
        return this.x === other.x && this.y === other.y
    }


}
export default Vector2