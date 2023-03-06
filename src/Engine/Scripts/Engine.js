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
    point: [0, 0],
    objects: {},
    playerObject: null,
    initialze() {
        for (const key in this.objects) {
            const currentObj = this.objects[key];
            if (currentObj.render !== undefined) {
                currentObj.render(root);
            }

            currentObj.positionChanged = true;
            currentObj.recordPostion(this.gridMap);
            currentObj.positionChanged = false;

            currentObj.Destroy = this.Destroy;
        }
        this.isInitialized = true;
    },
    update() {
        for (const key in this.objects) {
            const currentObj = this.objects[key];
            let checkCollision = false;
            if (this.playerObject) {
                checkCollision = this.willPlayerCollide();
            }

            if (currentObj.rerender !== undefined) {

                const point = [this.grid[0][this.currentX], this.grid[1][this.currentY]]

                if (currentObj.isPlayer) {

                    currentObj.rerender(point)

                    if (!this.playerObject) {
                        this.playerObject = currentObj;
                    }

                }
                else {
                    currentObj.rerender();
                }


                currentObj.recordPostion(this.gridMap);
            }
        }
    },
    controlInput(e) {
        if (e.key === 'w') {
            if (this.currentY > 0) {
                if (!this.willPlayerCollide(undefined, this.currentY - 1))
                    this.currentY -= 1;
            }
        }
        if (e.key === 's') {
            if (this.currentY < this.grid[1].length) {
                if (!this.willPlayerCollide(undefined, this.currentY + 1))
                    this.currentY += 1;
            }
        }
        if (e.key === 'a') {
            if (this.currentX > 0) {
                if (!this.willPlayerCollide(this.currentX - 1, undefined))
                    this.currentX -= 1;
            }
        }
        if (e.key === 'd') {
            if (this.currentX < this.grid[0].length) {
                if (!this.willPlayerCollide(this.currentX + 1, undefined))
                    this.currentX += 1;
            }
        }

        this.point = [this.grid[0][this.currentX], this.grid[1][this.currentY]];
    },
    addObjects(Objs) {
        for (const object of Objs) {
            const newKey = object.id;
            this.objects[newKey] = object;
        }
    },
    Destroy() {
        const id = this.id;
        console.log(id)
        const target = document.getElementById(id);
        const parent = target.parentNode;

        parent.removeChild(target);
    },
    willPlayerCollide(currentX = this.currentX, currentY = this.currentY) {
        const [x, y] = [this.grid[0][currentX], this.grid[1][currentY]]
        const width = this.playerObject.width;
        const height = this.playerObject.height;
        const newRect = [[x, y], [x, y + width], [x + height, y], [x + height, y + width]]
        let isColliding = false;

        newRect.forEach((i) => {
            const key = `[${i[0]},${i[1]}]`;
            const target = this.gridMap[key];
            if (target.owner) {
                if (target.owner !== this.playerObject) {
                    isColliding = true;
                }
            }
        })

        return isColliding
    }
}
