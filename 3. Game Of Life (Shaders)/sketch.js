/// ----------------------------------
/// Public variables
/// ----------------------------------

let gameOfLifeShader;
let prevFrame;

let gridSize = 750;
let canvasSize = gridSize + 50;

/// ----------------------------------
/// Life Cycle
/// ----------------------------------

function preload() {
  gameOfLifeShader = loadShader(
    "./shaders/gameOfLife.vert",
    "./shaders/gameOfLife.frag"
  );
}

function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  pixelDensity(1);
  noSmooth();

  prevFrame = createGraphics(width, height);
  prevFrame.pixelDensity(1);
  prevFrame.noSmooth();

  background(0);
  stroke(255);
  shader(gameOfLifeShader);

  gameOfLifeShader.setUniform("normalRes", [1.0 / width, 1.0 / height]);
}

function draw() {
  drawWithMouseIfPressed();

  // Copy the rendered image into our prevFrame image
  prevFrame.image(get(), 0, 0);

  // Set the image of the previous frame into our shader
  gameOfLifeShader.setUniform("tex", prevFrame);

  // Give the shader a surface to draw on
  rect(-width / 2, -height / 2, width, height);
}

/// ----------------------------------
/// Controls
/// ----------------------------------

function drawWithMouseIfPressed() {
  if (mouseIsPressed) {
    line(
      pmouseX - width / 2,
      pmouseY - height / 2,
      mouseX - width / 2,
      mouseY - height / 2
    );
  }
}
