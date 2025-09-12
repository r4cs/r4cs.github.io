function handleMovement() {
    player.animate = false;

    if (keyboardState.w.pressed && lastPressedKey === 'w') {
        handleUpMovement();
    } else if (keyboardState.a.pressed && lastPressedKey === 'a') {
        handleLeftMovement();
    } else if (keyboardState.s.pressed && lastPressedKey === 's') {
        handleDownMovement();
    } else if (keyboardState.d.pressed && lastPressedKey === 'd') {
        handleRightMovement();
    }
}

function handleUpMovement() {
    player.animate = true;
    player.image = player.sprites.up;

    checkForCharacterCollision({
        characters,
        player,
        interactionOffset: { x: 0, y: MOVEMENT.SPEED }
    });

    if (checkBoundaryCollision('up')) {
        moveEntitiesY(MOVEMENT.SPEED);
    }
}

function handleLeftMovement() {
    player.animate = true;
    player.image = player.sprites.left;

    checkForCharacterCollision({
        characters,
        player,
        interactionOffset: { x: MOVEMENT.SPEED, y: 0 }
    });

    if (checkBoundaryCollision('left')) {
        moveEntitiesX(MOVEMENT.SPEED);
    }
}

function handleDownMovement() {
    player.animate = true;
    player.image = player.sprites.down;

    checkForCharacterCollision({
        characters,
        player,
        interactionOffset: { x: 0, y: -MOVEMENT.SPEED }
    });

    if (checkBoundaryCollision('down')) {
        moveEntitiesY(-MOVEMENT.SPEED);
    }
}

function handleRightMovement() {
    player.animate = true;
    player.image = player.sprites.right;

    checkForCharacterCollision({
        characters,
        player,
        interactionOffset: { x: -MOVEMENT.SPEED, y: 0 }
    });

    if (checkBoundaryCollision('right')) {
        moveEntitiesX(-MOVEMENT.SPEED);
    }
}

function checkBoundaryCollision(direction) {
    for (let boundaryIndex = 0; boundaryIndex < boundaries.length; boundaryIndex++) {
        const boundary = boundaries[boundaryIndex];
        let collided = false;

        switch (direction) {
            case 'up':
                collided = rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + MOVEMENT.SPEED
                        }
                    }
                });
                break;
            case 'left':
                collided = rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + MOVEMENT.SPEED,
                            y: boundary.position.y
                        }
                    }
                });
                break;
            case 'down':
                collided = rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - MOVEMENT.SPEED
                        }
                    }
                });
                break;
            case 'right':
                collided = rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - MOVEMENT.SPEED,
                            y: boundary.position.y
                        }
                    }
                });
                break;
        }

        if (collided) {
            return false;
        }
    }
    return true;
}

function moveEntitiesX(amount) {
    movableEntities.forEach((movableEntity) => {
        movableEntity.position.x += amount;
    });
}

function moveEntitiesY(amount) {
    movableEntities.forEach((movableEntity) => {
        movableEntity.position.y += amount;
    });
}

function renderEntities() {
    renderableEntities.forEach((renderableEntity) => {
        renderableEntity.draw();
    });
}

function animate() {
    const animationFrameId = window.requestAnimationFrame(animate);
    
    renderEntities();
    handleMovement();
}
