import { GameObject } from "./GameObject";

export class DynamicObject extends GameObject {
    objectType = 'dynamic'
    currentAnimation = 0;
    currentPosition = 0;
    finsishedRoute = false;
    isPlayer = false;


    constructor(animation = [], routeMap = [], args) {
        super(args);
        this.animation = animation;
        this.routeMap = routeMap;
        this.rerender()
    }

    rerender(newPosition) {
        const changeImage = this.changeImage;
        const newRoute = this.changePostion();

        if (newPosition) {
            this.positionChanged = newPosition[0] !== this.position[0] || newPosition[1] !== this.position[1];
            if (this.positionChanged) {
                this.setPostion(newPosition);
                this.createRects();
            }
        }
        else if (this.routeMap.length) {
            this.positionChanged = newRoute[0] !== this.position[0] || newRoute[1] !== this.position[1];
            this.setPostion(newRoute);

        }
        if (this.animation.length) {
            changeImage();
        }
        this.spawn();
    }

    setPostion(position) {
        this.position = position;
    }

    changeImage() {
        if (this.currentAnimation >= 0) {
            this.currentAnimation++;
        }
        if (this.currentAnimation === this.animation.length - 1) {
            this.currentAnimation = 0;
        }
        this.image = this.animation[this.currentAnimation];
    }

    changePostion() {
        let collision = false;
        let currentPosition = this.currentPosition;
        if (!this.finsishedRoute) {
            if (currentPosition >= 0) {
                currentPosition++;
            }
            if (currentPosition === this.routeMap.length - 1) {
                this.finsishedRoute = true;
            }
        }
        else {
            if (currentPosition > 0) {
                currentPosition--;
            }
            if (currentPosition === 0) {
                this.finsishedRoute = false;
            }
        }
        collision = this.willCollide(this.routeMap[currentPosition])

        if (!collision) {
            this.currentPosition = currentPosition;
        }
        else {
            this.currentPosition = this.routeMap.length - 1;
        }
        return this.routeMap[this.currentPosition]
    }


    willCollide(newRoute) {
        if (!this.gridMap || !newRoute) return false;
        const [x, y] = newRoute;
        const rects = [[x, y], [x, y + this.width], [x + this.height, y], [x + this.height, y + this.width]]
        let isColliding = false;

        rects.forEach((i) => {
            const key = `[${i[0]},${i[1]}]`;
            const target = this.gridMap[key];
            if (target.owner) {
                if (target.owner !== this) {
                    isColliding = true;
                }
            }
        })

        return isColliding

    }
}