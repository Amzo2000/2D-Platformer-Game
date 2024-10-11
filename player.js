class Player {
    constructor(position, size, scale) {
        // Initialize player's position, size (scaled), and velocity
        this.position = position;
        this.size = size.mul(scale);
        this.velocity = new Vector2(0, 0);
        // Player's movement speed and jump force
        this.speed = 3;
        this.jumpForce = 5;
        this.isOnGround = false;  // Tracks if the player is on the ground
        this.direction = 1;  // 1 for right-facing, -1 for left-facing

        // Object to store movement state (left, right, up, down)
        this.movement = { left: false, up: false, right: false, down: false };

        // Object to track if the player is attacking
        this.actions = { attack: false };

        // Initialize animation controller for handling sprite animations
        this.animationController = new AnimationController(this.size);
        // Initialize player animations (idle, run, jump, attack)
        this.initializeAnimations();
    }

    initializeAnimations() {
        // Add animations with the name, image source, frame count, and frame duration
        this.animationController.addAnimation('Idle', './assets/Biker_idle.png', 4, 100);
        this.animationController.addAnimation('Run', './assets/Biker_run.png', 6, 100);
        this.animationController.addAnimation('Jump', './assets/Biker_jump.png', 4, 200, false);  // Loop is false
        this.animationController.addAnimation('Attack', './assets/Biker_attack1.png', 6, 100, false, true);  // Loop and hold pose

        // Set the default animation to 'Idle'
        this.animationController.playAnimation('Idle');
    }

    // Handle key down events for player controls
    handleKeyDown(event) {
        switch (event.key) {
            case 'ArrowLeft': this.movement.left = true; break;
            case 'ArrowUp': this.movement.up = true; break;
            case 'ArrowRight': this.movement.right = true; break;
            case 'ArrowDown': this.movement.down = true; break;
            case 'a': this.actions.attack = true; break;  // 'a' triggers attack action
        }
    }

    // Handle key up events (stop movement/attack when key is released)
    handleKeyUp(event) {
        switch (event.key) {
            case 'ArrowLeft': this.movement.left = false; break;
            case 'ArrowUp': this.movement.up = false; break;
            case 'ArrowRight': this.movement.right = false; break;
            case 'ArrowDown': this.movement.down = false; break;
            case 'a': this.actions.attack = false; break;  // Stop attack when 'a' is released
        }
    }

    // Check if the player is colliding with the ground
    checkGroundCollision() {
        if (this.position.y + this.size.y > ground.position.y) {  // If player's bottom exceeds ground's top
            this.velocity.y = 0;  // Stop downward movement
            this.position.y = ground.position.y - this.size.y;  // Place player on top of the ground
            this.isOnGround = true;  // Player is now on the ground
        } else {
            this.isOnGround = false;  // Player is in the air
        }
    }

    // Update player's position based on input and apply gravity
    updatePosition() {
        if (this.movement.right) {
            this.direction = 1;  // Face right
            this.velocity.x = this.speed;  // Move right
        }
        if (this.movement.left) {
            this.direction = -1;  // Face left
            this.velocity.x = -this.speed;  // Move left
        }

        // Apply jump force if player is on the ground and presses up
        if (this.movement.up && this.isOnGround) {
            this.velocity.y = -this.jumpForce;
            this.isOnGround = false;
        }

        // Stop horizontal movement if no left or right input
        if (!this.movement.left && !this.movement.right) {
            this.velocity.x = 0;
        }

        // Apply gravity to vertical velocity and update the position
        this.velocity = this.velocity.add(GRAVITY);
        this.position = this.position.add(this.velocity);

        // Update player's animation based on current state
        this.updateAnimationState();
    }

    // Determine which animation to play based on the player's state
    updateAnimationState() {
        if (!this.isOnGround) {
            // Play jump animation if player is airborne
            this.animationController.playAnimation('Jump', true);
            return;
        }

        if (this.movement.left || this.movement.right) {
            // Play running animation if moving horizontally
            this.animationController.playAnimation('Run', true);
            return;
        }

        if (this.isOnGround && !this.movement.left && !this.movement.right && !this.actions.attack) {
            // Default to idle animation if player is on the ground and not moving/attacking
            this.animationController.playAnimation('Idle');
        }

        if (this.actions.attack) {
            // Play attack animation if the player is attacking
            this.animationController.playAnimation('Attack');
        }
    }

    // Render player to the screen
    render() {
        this.animationController.draw(this.position, this.direction);
    }

    // Update player's position, check for collisions, and render them
    update() {
        this.updatePosition();
        this.checkGroundCollision();
        this.render();
    }
}
