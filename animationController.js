class AnimationController {
    // Constructor to initialize the AnimationController
    constructor(spriteSize) {
        // Defines the size of each frame in the spritesheet (default is 48x48)
        this.frameSize = new Vector2(48, 48);
        // Define the offset for the sprite's position when rendered on the canvas
        this.spriteOffset = new Vector2(-10, 0);
        // Size of the sprite to be rendered on screen
        this.spriteSize = spriteSize;
        // Object to store all animations associated with this controller
        this.animations = {};
        // The currently playing animation
        this.currentAnimation = null;
        // Name of the current animation
        this.currentAnimationName = "";
    }

    // Method to add a new animation to the controller
    addAnimation(name, src, frameCount, frameDuration, loop = true, animationLocked = false) {
        // Adds a new SpriteAnimation to the animations dictionary, with the given properties
        this.animations[name] = new SpriteAnimation(
            src,                            // Path to the image/spritesheet
            this.frameSize,                 // Size of each frame in the spritesheet
            this.spriteSize,                // Size to render the sprite on the screen
            this.spriteOffset,              // Offset to adjust sprite positioning
            frameCount,                     // Number of frames in the animation
            frameDuration,                  // Duration (ms) each frame is displayed
            loop,                           // Whether the animation loops or not
            animationLocked                 // Locks the animation from being interrupted
        );
    }

    // Method to play a specific animation by name
    playAnimation(name, overrideAnimation = false) {
        // Checks if the requested animation exists
        if (this.animations[name]) {
            // If the current animation is locked, avoid overriding it unless specified
            if (this.currentAnimation?.animationLocked && this.currentAnimation.isAnimating && !overrideAnimation) return;
            // Avoid restarting the same animation if it's already playing and not locked
            if (name === this.currentAnimationName && !this.currentAnimation.animationLocked) return;

            // Stop the current animation if it's already playing
            if (this.currentAnimation) {
                this.currentAnimation.stop();
            }

            // Set the new animation as the current one and start playing it
            this.currentAnimationName = name;
            this.currentAnimation = this.animations[name];
            this.currentAnimation.start();
        }
    }

    // Method to render the current animation at a specific position
    draw(pos, direction = 1) {
        // Check if there is an active animation
        if (this.currentAnimation) {
            // Set the direction (for flipping the sprite horizontally)
            this.currentAnimation.setDirection(direction);
            // Set the position where the animation should be drawn
            this.currentAnimation.setPos(pos);
            // Render the current frame of the animation
            this.currentAnimation.draw();
        }
    }

    // Method to stop the current animation
    stopAnimation() {
        // If an animation is currently playing, stop it and reset the current animation
        if (this.currentAnimation) {
            this.currentAnimation.stopAnimation();
            this.currentAnimation = null;
        }
    }
}
