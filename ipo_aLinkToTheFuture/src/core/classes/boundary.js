// js/classes/boundary.js

import { canvasContext } from "../canvas.js";


export class Boundary {

  	static width = 64;
    static height = 64;

    constructor( {position} ) {
        this.position = position;
        this.width = 64; // pixels
        this.height = 64; // pixels
    }
    draw() {
//        canvasContext.fillStyle = "rgba(255, 0, 0, 0.2)";
        canvasContext.fillStyle = "rgba(255, 0, 0, 0.8)";
        canvasContext.fillRect(
            this.position.x, 
            this.position.y,  
            this.width, 
            this.height
        );
    }
}