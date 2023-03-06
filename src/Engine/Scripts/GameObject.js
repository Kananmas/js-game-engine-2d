export class GameObject {
    types = ['solid-unwalkable', 'solid-walkable', 'dynamic']
    objectType = ''
    width = 100;
    height = 100;
    htmlElement = document.createElement('div');
    id = Math.random().toString(16).slice(2);
    hasCustomStyles = false;
    areCustomStylesApplied = false;
    oldPosition = [];
    positionChanged = false;

    constructor(position = [0, 0], image) {
        this.position = position;
        this.oldPosition = position;
        this.image = image;

        this.render()
    }

    changeType(type = '') {
        const types = this.types;
        const haveTargetType = types.includes(types);

        if (haveTargetType) {
            this.objectType = type;
        }
    }

    render(root = document.createElement('div')) {
        this.spawn();
        this.createRects();
        root.appendChild(this.htmlElement);
    }

    spawn() {
        // sizing
        this.htmlElement.style.width = this.width + 'px';
        this.htmlElement.style.height = this.height + 'px';
        // positioning
        this.htmlElement.style.position = 'absolute'
        this.htmlElement.style.left = this.position[0] + 'px';
        this.htmlElement.style.top = this.position[1] + 'px';
        if (!this.hasCustomStyles) {
            // coloring
            this.htmlElement.style.backgroundColor = 'black';
            this.htmlElement.id = this.id;
        }
    }

    applyCustomStyles(styles = {}) {
        const renderedElement = document.getElementById(this.id)
        if (!Object.keys(styles).length) return;
        if (renderedElement) {
            for (const key in styles) {
                if (renderedElement.style[key] !== styles[key]) {
                    renderedElement.style[key] = styles[key]
                }
            }
        }
        else {
            this.customStyles = styles;
        }
        this.hasCustomStyles = true;
    }

    recordPostion(grid) {
        if (this.positionChanged) {
            this.unrecordPostion(grid);
            const [x, y] = this.position;
            const rects = [[x, y], [x, y + this.width], [x + this.height, y]]

            const posVertLine = createVerticalLine(rects[0], this.height);
            const posHorLine = createHorizontalLine(rects[0], this.width);
            const negVertLine = createVerticalLine(rects[1], this.height);
            const negHorLine = createHorizontalLine(rects[2], this.width);

            let allPoints = new Array();
            allPoints = allPoints.concat(posVertLine, posHorLine, negVertLine, negHorLine)

            allPoints.forEach((point) => {
                const key = `[${point[0]},${point[1]}]`
                const target = grid[key];
                target.owner = this;
            })
            this.oldPosition = this.position;
        }
    }

    unrecordPostion(grid) {
        const [x, y] = this.oldPosition;
        const rects = [[x, y], [x, y + this.width], [x + this.height, y]]

        const posVertLine = createVerticalLine(rects[0], this.height);
        const posHorLine = createHorizontalLine(rects[0], this.width);
        const negVertLine = createVerticalLine(rects[1], this.height);
        const negHorLine = createHorizontalLine(rects[2], this.width);

        let allPoints = new Array();
        allPoints = allPoints.concat(posVertLine, posHorLine, negVertLine, negHorLine)

        allPoints.forEach((point) => {
            const key = `[${point[0]},${point[1]}]`
            const target = grid[key];
            target.owner = null;
        })
    }

    createRects() {
        const [x, y] = this.position;
        this.rects = [[x, y], [x, y + this.width], [x + this.height, y], [x + this.height, y + this.width]]
    }
}


function createHorizontalLine([x, y], till) {
    let points = [];

    for (let i = 0; i <= till; i = i + 2) {
        points.push([x, y + i]);
    }

    return points;
}

function createVerticalLine([x, y], till) {
    let points = [];

    for (let i = 0; i <= till; i = i + 2) {
        points.push([x + i, y]);
    }

    return points;
}