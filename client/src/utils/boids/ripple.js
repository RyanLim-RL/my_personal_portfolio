

class Ripple{
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.radius = 10; 
        this.opacity = 0.6;
    }
    update(){
        this.radius += 2; 
        this.opacity -= 0.02; 
    }
    checkTransparent(){
        return this.opacity <= 0;
    }

}

const noiseScale = 0.01; 
function perlin(x, y) {
    return (Math.sin(x * noiseScale) + Math.cos(y * noiseScale)) / 2;
}

class Ripples {
    constructor() {
        this.ripples = [];
    }

    update() {
        this.ripples.forEach(ripple => {
            ripple.update();
            if (ripple.checkTransparent()){
                this.ripples.splice(this.ripples.indexOf(ripple), 1);
            }
        });
    }

    add(x,y){
        if(Math.random() >0.005) return;
        this.ripples.push(new Ripple(x + perlin(x, y) * 20, y));
    }

    getRipples(){
        return this.ripples;
    }
}

export default Ripples;