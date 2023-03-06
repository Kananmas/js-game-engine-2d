import { createGrid } from "./Base";
import { createGridMap } from "./Base";


const grid = createGrid();
const root = document.getElementById('root');
const gridMap = createGridMap(grid);



export const Engine = {
    grid,
    gridMap,
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
            currentObj.recordPostion(this.gridMap)();
        }

        this.isInitialized = true;
    },
    update() {
        for (const key in this.objects) {
            const currentObj = this.objects[key];

            if (currentObj.rerender !== undefined) {
                const point = [this.grid[0][this.currentX], this.grid[0][this.currentY]]
                if (currentObj.isPlayer) {
                    currentObj.rerender(point)
                }
                else { currentObj.rerender(); }
                currentObj.recordPostion(this.gridMap)();
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
    addObjects(Objs) {
        for (const object of Objs) {
            const newKey = object.id;
            this.objects[newKey] = object;
        }
    },
    Destoy(id) {
        const target = document.getElementById(id);
        const parent = target.parentElement;

        parent.removeChild(target);
    }
}
