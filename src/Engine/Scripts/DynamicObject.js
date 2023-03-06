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
    }

    rerender(newPosition) {
        const changeImage = this.changeImage();
        const newRoute = this.changePostion();
        if (!this.areCustomStylesApplied) {
            this.applyCustomStyles(this.customStyles);
        }
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
        if (!this.finsishedRoute) {
            if (this.currentPosition >= 0) {
                this.currentPosition++;
            }
            if (this.currentPosition === this.routeMap.length - 1) {
                this.finsishedRoute = true;
            }
        }
        else {
            if (this.currentPosition > 0) {
                this.currentPosition--;
            }
            if (this.currentPosition === 0) {
                this.finsishedRoute = false;
            }
        }
        return this.routeMap[this.currentPosition]
    }

}
