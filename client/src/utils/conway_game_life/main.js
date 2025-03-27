class Conway_Game_Of_Life{
    constructor(width, height, cellSize){
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.cols = Math.floor(this.width / this.cellSize);
        this.rows = Math.floor(this.height / this.cellSize);
        this.grid = this.initGrid();
        this.next = this.initGrid();
        this.init();
    }

    initGrid(){
        let grid = new Array(this.cols);
        for (let i = 0; i < this.cols; i++) {
            grid[i] = new Array(this.rows);
        }
        return grid;
    }

    init(){
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.grid[i][j] = Math.floor(Math.random() * 2);
            }
        }
    }

    countNeighbors(x, y){
        let sum = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let col = (x + i + this.cols) % this.cols;
                let row = (y + j + this.rows) % this.rows;
                sum += this.grid[col][row];
            }
        }
        sum -= this.grid[x][y];
        return sum;
    }

    update(){
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                let state = this.grid[i][j];
                let neighbors = this.countNeighbors(i, j);
                if (state === 0 && neighbors === 3) {
                    this.next[i][j] = 1;
                } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                    this.next[i][j] = 0;
                } else {
                    this.next[i][j] = state;
                }
            }
        }
        let temp = this.grid;
        this.grid = this.next;
        this.next = temp;
    }
}

export default Conway_Game_Of_Life;