// src/core/main.js - SIMPLIFICADO
// import { initGame } from './game.js';

// console.log("🔄 Starting migration phase 1...");

// document.addEventListener('DOMContentLoaded', () => {
//   console.log("✅ DOM loaded, initializing game...");
  
//   // Confiar que game.js já carregou tudo
//   initGame();
// });

// export {};

// src/core/main.js - FASE 1 (atualizado)
import { initGame } from './game.js';
import * as Constants from './constants/index.js';

console.log("🔄 Starting migration phase 1...");

// Verificar se constantes estão carregadas
function checkConstants() {
  if (!Constants.CANVAS) {
    console.error("❌ Constants not loaded!");
    return false;
  }
  console.log("✅ Constants loaded successfully");
  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ DOM loaded");
  
  if (checkConstants()) {
    console.log("🎮 Initializing game...");
    initGame();
  } else {
    console.error("❌ Failed to load game constants");
  }
});

export {};