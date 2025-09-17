// src/core/main.js - SIMPLIFICADO
import { initGame } from './game.js';

console.log("🔄 Starting migration phase 1...");

document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ DOM loaded, initializing game...");
  
  // Confiar que game.js já carregou tudo
  initGame();
});

export {};