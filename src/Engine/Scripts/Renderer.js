import { createGrid } from "./Base";

const grid = createGrid();
const root = document.getElementById('root');

export const Engine = {
    grid,
    isInitialized: false,
    currentX: 0,
    currentY: 0,
    objects: {},
    initialze() {
        for (const key in this.objects) {
            const currentObj = this.objects[key];

            if (currentObj.render !== undefined) {
                currentObj.render(root);
            }
        }
        this.isInitialized = true;
    },
    update() {
        for (const key in this.objects) {
            const currentObj = this.objects[key];

            if (currentObj.rerender !== undefined) {
                currentObj.rerender();
            }
        }
    },
    controlInput(e) {
        if (e.key === 'w') {
            if (this.currentY > 0)
                this.currentY -= 1;
        }
        if (e.key === 's') {
            if (this.currentY < this.grid[1].length)
                this.currentY += 1;
        }
        if (e.key === 'a') {
            if (this.currentX > 0)
                this.currentX -= 1;
        }
        if (e.key === 'd') {
            if (this.currentX < this.grid[0].length)
                this.currentX += 1;
        }
    },
    addObjects(newObj) {
        const newKey = Math.random().toString(16).slice(2)
        this.objects[newKey] = newObj;
    }
}