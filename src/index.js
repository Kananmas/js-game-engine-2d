
const windowXSize = window.innerWidth;
const windowYSize = window.innerHeight;

function createGrid() {
    let unit = 2;
    let result = [[], []]

    for (let x = 0; x <= windowXSize; x += unit) {
        result[0].push(x);
    }
    for (let y = 0; y <= windowYSize; y += unit) {
        result[1].push(y);
    }

    return result
}

let Grid = createGrid()
const root = document.getElementById('root');

let currentX = 0;
let currentY = 0;

let player = document.getElementById('player');

player.style.left = Grid[0][currentX] + 'px'
player.style.top = Grid[1][currentY] + 'px'
player.style.right = windowXSize - Grid[0][currentX] + 'px'
player.style.bottom = windowYSize - Grid[1][currentY] + 'px'

function controlInput(e) {
    if (e.key === 'w') {
        if (currentY > 0)
            currentY -= 1;

    }
    if (e.key === 's') {
        if (currentY < Grid[1].length)
            currentY += 1;
    }
    if (e.key === 'a') {
        if (currentX > 0)
            currentX -= 1;
    }
    if (e.key === 'd') {
        if (currentX < Grid[0].length)
            currentX += 1;
    }
}


setInterval(() => {
    player.style.left = Grid[0][currentX] + 'px'
    player.style.top = Grid[1][currentY] + 'px'
    player.style.right = windowXSize - Grid[0][currentX] + 'px'
    player.style.bottom = windowYSize - Grid[1][currentY] + 'px'
}, 100);

window.addEventListener('keydown', (e) => controlInput(e), true)



