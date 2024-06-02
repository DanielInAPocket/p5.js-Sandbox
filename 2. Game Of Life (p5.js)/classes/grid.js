class Grid {
  constructor(size) {
    this.grid = new Array(size);

    for (let x = 0; x < size; x++) {
      this.grid[x] = new Array(size);
      for (let y = 0; y < size; y++) {
        this.grid[x][y] = new Cell(new Position(x, y), gridSize / size);
      }
    }
  }

  show() {
    this.grid.forEach((col) => {
      col.forEach((element) => {
        element.show();
      });
    });
  }

  toggleElement(pos) {
    this.grid[pos.x][pos.y].isAlive = !this.grid[pos.x][pos.y].isAlive;
  }

  prepareEvolution() {
    this.grid.forEach((col) => {
      col.forEach((element) => {
        let neighbours = [];

        this.neighbourOffsets.forEach((offset) => {
          const neighbour =
            this.grid[element.pos.x + offset.x]?.[element.pos.y + offset.y];
          if (neighbour) {
            neighbours.push(neighbour);
          }
        });

        element.prepareEvolution(neighbours);
      });
    });
  }

  evolve() {
    this.grid.forEach((col) => {
      col.forEach((element) => {
        element.evolve();
      });
    });
  }

  randomize() {
    this.grid.forEach((col) => {
      col.forEach((element) => {
        element.isAlive = getRandomBool();
      });
    });
  }

  neighbourOffsets = [
    new Position(-1, -1),
    new Position(0, -1),
    new Position(1, -1),
    new Position(-1, 0),
    new Position(1, 0),
    new Position(-1, 1),
    new Position(0, 1),
    new Position(1, 1),
  ];
}
