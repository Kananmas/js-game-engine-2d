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
        this.htmlElement.id = this.id;
        // sizing
        this.htmlElement.style.width = this.width + 'px';
        this.htmlElement.style.height = this.height + 'px';
        // positioning
        this.htmlElement.style.position = 'absolute'
        this.htmlElement.style.left = this.position[0] + 'px';
        this.htmlElement.style.top = this.position[1] + 'px';
        // coloring
        if (!this.image) { this.htmlElement.style.backgroundColor = 'black' }
        else {
            this.htmlElement.style.backgroundImage = `url(${this.image})`;
            this.htmlElement.style.backgroundSize = `${this.width}px ${this.height}px`
            this.htmlElement.style.backgroundColor = ''
        }

        if (this.hasCustomStyles) {
            this.applyCustomStyles(this.customStyles);
        }
    }

    applyCustomStyles(styles = {}) {
        const renderedElement = document.getElementById(this.id)
        if (!Object.keys(styles).length) return;
        if (renderedElement) {
            for (const key in styles) {
                if (renderedElement.style[key] !== styles[key]) {
                    renderedElement.style[key] = styles[key];
                }
            }
        }
        else {
            this.customStyles = styles;
        }
        this.hasCustomStyles = true;
    }

    recordPosition() {
        if (this.positionChanged) {
            this.unrecordPosition(this.gridMap);
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
                const target = this.gridMap[key];
                target.owner = this;
            })
            this.oldPosition = this.position;
        }
    }

    unrecordPosition() {
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
            const target = this.gridMap[key];
            target.owner = null;
        })
    }

    createRects() {
        const [x, y] = this.position;
        this.rects = [[x, y], [x, y + this.width], [x + this.height, y], [x + this.height, y + this.width]]
    }

    catchFirstRecord() {
        if (this.objectType !== 'solid-walkable') {
            this.positionChanged = true;
            this.recordPosition(this.gridMap);
            this.positionChanged = false;
        }
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