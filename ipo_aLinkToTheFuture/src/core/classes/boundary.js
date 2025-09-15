// js/classes/boundary.js
class Boundary {

  	static width = 64;
    static height = 64;

    constructor( {position} ) {
        this.position = position;
        this.width = 64; // pixels
        this.height = 64; // pixels
    }
    draw() {
//        c.fillStyle = "rgba(255, 0, 0, 0.2)";
        c.fillStyle = "rgba(255, 0, 0, 0.8)";
        c.fillRect(
            this.position.x, 
            this.position.y,  
            this.width, 
            this.height
        );
    }
}