// src/ui/dialog-manager.js
import { Dialogo } from "../core/classes/dialogo";
import { mainMenuDialogue } from "../../assets/data/dialogos";

export class DialogManager {
    constructor() {
        this.player = null;
        this.dialogModal = document.getElementById("dialog-modal");
        this.characterDialogueBox = document.getElementById('characterDialogueBox');
        this.startBtn = document.getElementById("start-button");
        this.quitBtn = document.getElementById("quit-button");
        this.dialogo = null;
        this.init();
    }

    init() {
        if (mainMenuDialogue) {
            this.dialogo = new Dialogo(mainMenuDialogue);
            this.dialogo.initDialog();
        }

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.quitBtn.addEventListener('click', () => {
            this.hideDialog();
        });

        // Listener para tecla espaço
        addEventListener('keydown', (e) => {
            if (e.key === ' ' && this.player) {
                this.handlePlayerInteraction(this.player);
            }
        });
    }

    handlePlayerInteraction(player) {
        if (!player.interactionAsset) return;

        if (!player.interactionAsset.character.dialogue) {
            this.showMainDialog();
        } else {
            this.startCharacterDialogue(player.interactionAsset.character);
        }
    }

    showMainDialog() {
        this.dialogModal.style.display = "flex";
        
        if (!this.player.interactionAsset.character.dialogue) {
            this.startBtn.style.display = "flex";
        }
    }

    hideDialog() {
        this.dialogModal.style.display = "none";
        this.startBtn.style.display = "none";
        this.characterDialogueBox.style.display = 'none';
        
        if (this.player) {
            this.player.isInteracting = false;
        }
    }

    startCharacterDialogue(character) {
        console.log('Starting conversation with NPC');
        const firstMessage = character.dialogue[0];
        this.characterDialogueBox.innerHTML = firstMessage;
        this.characterDialogueBox.style.display = 'flex';
        
        if (this.player) {
            this.player.isInteracting = true;
        }
    }

    setPlayer(player) {
        this.player = player;
    }

    // Método para iniciar diálogo programaticamente
    startDialogue(dialogueTree) {
        if (this.dialogo) {
            this.dialogo.sycamore.emitter.emit('finished');
        }
        this.dialogo = new Dialogo(dialogueTree);
        this.dialogo.initDialog();
        this.showMainDialog();
    }
}