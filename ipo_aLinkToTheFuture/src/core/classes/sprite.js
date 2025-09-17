// js/classes/sprite.js

import { canvasContext } from "../canvas.js";
import * as Constants from "../constants/constants.js"

export class Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: Constants.SPRITE.DEFAULTS.FRAMES_MAX, 
              hold: Constants.SPRITE.DEFAULTS.FRAMES_HOLD },
    sprites,
    animate = Constants.SPRITE.DEFAULTS.ANIMATE,
    rotation = Constants.SPRITE.DEFAULTS.ROTATION,
    scale = Constants.SPRITE.DEFAULTS.SCALE
  }) {
    this.position = position
    this.image = new Image()
    this.frames = { 
        ...frames,
        val: Constants.SPRITE.DEFAULTS.FRAMES_VAL, 
        elapsed: Constants.SPRITE.DEFAULTS.FRAMES_ELAPSED 
      };
    this.image.onload = () => {
      this.width = (this.image.width / this.frames.max) * scale
      this.height = this.image.height * scale
    }
    this.image.src = image.src
    this.animate = animate
    this.sprites = sprites
    this.opacity = Constants.SPRITE.DEFAULTS.OPACITY
    this.rotation = rotation
    this.scale = scale
  }

  draw() {
    canvasContext.save()
    canvasContext.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    )
    canvasContext.rotate(this.rotation)
    canvasContext.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    )
    canvasContext.globalAlpha = this.opacity

    const crop = {
      position: {
        x: this.frames.val * (this.width / this.scale),
        y: 0
      },
      width: this.image.width / this.frames.max,
      height: this.image.height
    }

    const image = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: this.image.width / this.frames.max,
      height: this.image.height
    }

    canvasContext.drawImage(
      this.image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      image.position.x,
      image.position.y,
      image.width * this.scale,
      image.height * this.scale
    )

canvasContext.restore()  // Restaura o estado anterior do contexto canvas

// Se a animação estiver desativada, interrompe a execução aqui
if (!this.animate) return

// Verifica se o sprite tem múltiplos frames de animação
if (this.frames.max > 1) {
  this.frames.elapsed++  // Incrementa o contador de tempo do frame atual
}

// Verifica se é hora de avançar para o próximo frame baseado no tempo de exibição (hold)
if (this.frames.elapsed % this.frames.hold === 0) {
  // Se não é o último frame, avança para o próximo
  if (this.frames.val < this.frames.max - 1) this.frames.val++
  // Se é o último frame, reinicia a animação (loop)
  else this.frames.val = 0
}
  }
}