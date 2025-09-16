// src/core/collision-detector.js
class CollisionDetector {
    static rectangularCollision({ rectangle1, rectangle2 }) {
        return (
            rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
            rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
            rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
            rectangle1.position.y + rectangle1.height >= rectangle2.position.y
        );
    }

    static checkForCharacterCollision({
        characters,
        player,
        characterOffset = { x: 0, y: 0 }
    }) {
        player.interactionAsset = null;
        
        for (let i = 0; i < characters.length; i++) {
            const character = characters[i];
            
            // Usar charactersMap se disponível globalmente
            const characterValue = window.charactersMap ?
                window.charactersMap[
                    Math.floor((character.position.y - window.offset.y) / BOUNDARY.HEIGHT)
                ]?.[
                    Math.floor((character.position.x - window.offset.x) / BOUNDARY.WIDTH)
                ] :
                null;

            if (this.rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...character,
                    position: {
                        x: character.position.x + characterOffset.x,
                        y: character.position.y + characterOffset.y
                    }
                }
            })) {
                player.interactionAsset = { character, characterValue };
                break;
            }
        }
    }

    static checkBoundaryCollision(player, boundaries, offsetX = 0, offsetY = 0) {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (this.rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x + offsetX,
                        y: boundary.position.y + offsetY
                    }
                }
            })) {
                return true;
            }
        }
        return false;
    }

    // Método auxiliar para verificar colisão em uma direção específica
    static canMoveInDirection(player, boundaries, direction, speed) {
        let offsetX = 0;
        let offsetY = 0;

        switch (direction) {
            case 'up':
                offsetY = speed;
                break;
            case 'down':
                offsetY = -speed;
                break;
            case 'left':
                offsetX = speed;
                break;
            case 'right':
                offsetX = -speed;
                break;
        }

        return !this.checkBoundaryCollision(player, boundaries, offsetX, offsetY);
    }
}