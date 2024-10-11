// Create a canvas element and get the 2D context for drawing
const canvas = document.createElement('canvas'),
    context = canvas.getContext('2d');

// Append the canvas to the body of the document
document.body.append(canvas);

// Set the frames per second
const FPS = 120;
// Set the width and height of the canvas to match the window's size
const WIDTH = canvas.width = innerWidth;
const HEIGHT = canvas.height = innerHeight;

// Define gravity as a small downward force (affects player's vertical velocity)
const GRAVITY = new Vector2(0, 0.1);

// Function to render the background, filling it with sky blue
const renderBackground = () => {
    context.fillStyle = 'skyblue';
    context.fillRect(0, 0, WIDTH, HEIGHT);
};

// Disable image smoothing for a pixelated style (useful for pixel art or low-res graphics)
context.imageSmoothingEnabled = false;

// Create the ground as a rectangle at the bottom of the screen
const ground = new Rect2(new Vector2(0, HEIGHT - 100), new Vector2(WIDTH, 100));

// Initialize the player object with a position, size, and scale
const player = new Player(new Vector2(200, 100), new Vector2(32, 40), 4);

// Add event listeners for keyboard inputs (key down and key up)
window.addEventListener('keydown', (e) => player.handleKeyDown(e));
window.addEventListener('keyup', (e) => player.handleKeyUp(e));

// Main game loop that runs at the specified FPS
setInterval(() => {
    // Render the background
    renderBackground();

    // Render the ground
    ground.render();

    // Update the player's position and animation
    player.update();

}, 1000 / FPS);  // 1000 milliseconds divided by FPS gives the interval for each frame
