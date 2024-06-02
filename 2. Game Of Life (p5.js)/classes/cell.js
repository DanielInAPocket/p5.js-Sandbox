class Cell {
  constructor(pos, size) {
    this.pos = pos;
    this.size = size;
    this.isAlive = getRandomBool(0);
    this.willBeAlive = false;
  }

  show() {
    fill(this.isAlive ? 0 : 255);
    stroke(100);
    rect(this.pos.x * this.size, this.pos.y * this.size, this.size, this.size);
  }

  prepareEvolution(neighbours) {
    const aliveNeighbours = neighbours.filter(
      (neighbour) => neighbour.isAlive
    ).length;

    if (this.isAlive) {
      if (aliveNeighbours < 2 || aliveNeighbours > 3) {
        this.willBeAlive = false;
      } else {
        this.willBeAlive = true;
      }
    } else {
      if (aliveNeighbours == 3) {
        this.willBeAlive = true;
      } else {
        this.willBeAlive = false;
      }
    }
  }

  evolve() {
    this.isAlive = this.willBeAlive;
    this.willBeAlive = false;
  }
}
