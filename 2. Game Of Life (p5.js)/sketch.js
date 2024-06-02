/// ----------------------------------
/// Public variables
/// ----------------------------------

let gridSize = 750;
let gridElementCount = 50;
let fps = 30;
let allowEvolution = false;
let canvasSize = gridSize + 50;
let isEvolutionInProgress = false;

/// ----------------------------------
/// Life Cycle
/// ----------------------------------

function setup() {
  createCanvas(canvasSize, canvasSize);

  showEvolutionButton();
  showFpsSlider();
  showRandomizeButton();

  grid = new Grid(gridElementCount);
}

function draw() {
  background(132, 19, 19);

  setTargetFPSLimit();
  showFpsCounter();

  grid.show();

  if (allowEvolution && !isEvolutionInProgress) {
    isEvolutionInProgress = true;

    grid.prepareEvolution();
    grid.evolve();

    isEvolutionInProgress = false;
  }
}

function setTargetFPSLimit() {
  fps = slider.value();
  frameRate(fps);
}

/// ----------------------------------
/// Controls
/// ----------------------------------

function showFpsCounter() {
  // Target FPS
  textSize(16);
  fill(255);
  text("Target FPS: " + fps, 1, gridSize + 16);

  // Actual FPS
  let actualFps = frameRate();
  fill(255);
  stroke(0);
  text("Actual FPS: " + actualFps.toFixed(2), 1, gridSize + 32);
}

function showEvolutionButton() {
  button = createButton("Toggle Evolution");
  button.position(200, gridSize);
  button.mousePressed(toggleEvolution);
}

function toggleEvolution() {
  allowEvolution = !allowEvolution;
}

/// ----------------------------------

function showRandomizeButton() {
  button = createButton("Randomize Cells");
  button.position(350, gridSize);
  button.mousePressed(randomizeElements);
}

function randomizeElements() {
  grid.randomize();
}

/// ----------------------------------

function showFpsSlider() {
  slider = createSlider(1, 60, 30);
  slider.position(200, gridSize + 20);
  slider.style("width", "200px");
}

/// ----------------------------------

function mousePressed() {
  if (mouseX > gridSize || mouseY > gridSize) {
    return;
  }

  let elementSize = gridSize / gridElementCount;
  let elementPos = new Position(
    Math.floor(mouseX / elementSize),
    Math.floor(mouseY / elementSize)
  );
  grid.toggleElement(elementPos);
}
