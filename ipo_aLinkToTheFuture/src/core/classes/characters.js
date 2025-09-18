// js/classes/character.js
import { Sprite } from "./sprite"

export class Character extends Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 4, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    scale = 1,
    dialogue = ['']
  }) {
    super({
      position,
      velocity,
      image,
      frames,
      sprites,
      animate,
      rotation,
      scale
    })
	this.dialogue = dialogue
    this.dialogueIndex = 0
  }
}

