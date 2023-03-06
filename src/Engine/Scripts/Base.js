export function createGrid() {
    let unit = 2;
    let result = [[], []]

    for (let x = 0; x <= window.innerWidth; x += unit) {
        result[0].push(x);
    }
    for (let y = 0; y <= window.innerHeight; y += unit) {
        result[1].push(y);
    }

    return result
}

export function createGridMap(grid) {
    grid = grid ? grid : createGrid();
    let xAxis = grid[0];
    let yAxis = grid[1];
    let gridMap = {};

    for (let i = 0; i < xAxis.length; i++) {
        for (let j = 0; j < yAxis.length; j++) {
            key = `[${xAxis[i]},${yAxis[j]}]`
            gridMap[key] = { hasOwner: false }
        }
    }
    return gridMap;
}