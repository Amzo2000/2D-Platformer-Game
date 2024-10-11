class SpriteAnimation {
    constructor(src, frameSize, spriteSize, offset = new Vector2(0, 0), frameCount, frameDuration, loop = true, animationLocked = false) {
        // Initialize sprite animation properties
        this.pos = new Vector2(0, 0); // Position of the sprite animation
        this.spritesheet = new Image(); // Image object for the sprite sheet
        this.frameSize = frameSize; // Size of each frame in the sprite sheet
        this.offset = offset; // Offset for the sprite in the sprite sheet
        this.spriteSize = spriteSize; // Size of the sprite to be drawn on the canvas
        this.frameCount = frameCount; // Total number of frames in the sprite sheet
        this.frameDuration = frameDuration; // Duration each frame is displayed in milliseconds
        this.currentFrame = 0; // Index of the current frame being displayed
        this.isAnimating = false; // Flag to check if the animation is currently running
        this.animationLocked = animationLocked; // Lock for the animation state
        this.animationId = null; // Identifier for the animation timeout
        this.isSpriteLoaded = false; // Flag to check if the sprite sheet has loaded
        this.direction = 1; // Direction of the sprite (1 for normal, -1 for flipped)
        this.loop = loop; // Flag to determine if the animation should loop
        this.initSprite(src); // Initialize the sprite sheet with the provided source
    }

    // Load the sprite sheet image
    initSprite(src) {
        this.spritesheet.src = src; // Set the source of the sprite sheet
        this.spritesheet.onload = () => this.isSpriteLoaded = true; // Set the loaded flag when the image is ready
    }

    // Start the animation
    start() {
        if (this.isAnimating) return; // Prevent starting if already animating
        this.isAnimating = true; // Set the animating flag to true
        this.currentFrame = 0; // Reset to the first frame
        this.play(); // Begin playing the animation
    }

    // Set the current frame to a specific index
    setFrame(index) {
        this.currentFrame = index % this.frameCount; // Ensure the frame index loops within bounds
    }

    // Set the position of the animation
    setPos(pos) {
        this.pos = pos; // Update the position to the new value
    }

    // Play the animation frames
    play() {
        if (!this.isAnimating) return; // Only play if the animation is currently running

        // Loop through frames or stop if not looping
        if (this.loop) {
            this.currentFrame = (this.currentFrame + 1) % this.frameCount; // Loop the frame index
        } else if (this.currentFrame < this.frameCount - 1) {
            this.currentFrame++; // Increment the current frame
        } else {
            this.stop(); // Stop the animation if not looping and last frame reached
        }

        // Use setTimeout to call play again after the frame duration
        this.animationId = setTimeout(() => this.play(), this.frameDuration);
    }

    // Set the direction of the sprite (1 for normal, -1 for flipped)
    setDirection(direction) {
        this.direction = direction; // Update the direction of the sprite
    }

    // Draw the current frame of the animation on the canvas
    draw() {
        const sx = this.offset.x + this.currentFrame * this.frameSize.x; // Source x coordinate
        const sy = this.offset.y; // Source y coordinate

        if (this.isSpriteLoaded) { // Check if the sprite has loaded
            context.save(); // Save the current canvas state
            // Translate to the center of the sprite position for scaling
            context.translate(this.pos.x + this.spriteSize.x / 2, this.pos.y + this.spriteSize.y / 2);
            context.scale(this.direction, 1); // Apply direction scaling
            // Translate back to original position
            context.translate(-(this.pos.x + this.spriteSize.x / 2), -(this.pos.y + this.spriteSize.y / 2));

            // Draw the current frame of the sprite
            context.drawImage(
                this.spritesheet,
                sx, sy, this.frameSize.x, this.frameSize.y, // Source rectangle
                this.pos.x, this.pos.y, this.spriteSize.x, this.spriteSize.y // Destination rectangle
            );

            context.restore(); // Restore the canvas state
        }
    }

    // Stop the animation
    stop() {
        this.isAnimating = false; // Set the animating flag to false
        clearTimeout(this.animationId); // Clear the animation timeout
    }
}
