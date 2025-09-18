// src/core/canvas.js
export const canvas = document.querySelector("canvas");
export const canvasContext = canvas.getContext("2d");

// Configuração inicial do canvas
export function setupCanvas(width, height) {
    canvas.width = width;
    canvas.height = height;
    return { canvas, canvasContext };
}