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