export class GameObject {
    types = ['solid-unwalkable', 'solid-walkable', 'dynamic']
    objectType = ''
    width = 100;
    height = 100;
    htmlElement = document.createElement('div');

    constructor(position = [0, 0], image) {
        this.position = position;
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
        // coloring
        this.htmlElement.style.backgroundColor = 'black';
    }

    customStyles(styles) {
        if (!Object.keys(styles).length) return;
        for (const key in styles) {
            this.htmlElement.style[key] = styles[key];
        }
    }
}

export class UnWalkableObject extends GameObject {
    constructor() {
        super();
        this.objectType = 'solid-unwalkable'
    }
}

export class WalkableObject extends GameObject {
    constructor() {
        super();
        this.objectType = 'solid-walkable'
    }
}

export class DynamicObject extends GameObject {
    objectType = 'dynamic'
    currentAnimation = 0;
    currentPosition = 0;
    finsishedRoute = false;
    isPlayer = false;

    constructor(animation = [0], routeMap) {
        super();
        this.animation = animation;
        this.routeMap = routeMap;
    }

    rerender(newPosition) {
        const changeImage = this.changeImage()
        const newRoute = changeImage()();

        if (newPosition) {
            this.setPostion(newPosition);
            this.spawn();
        }
        else {
            this.setPostion(newRoute);
            this.spawn();
        }

    }

    setPostion(position) {
        this.position = position;
    }

    changeImage() {
        return () => {
            if (this.currentAnimation >= 0) {
                this.currentAnimation++;
            }
            if (this.currentAnimation === this.animation.length - 1) {
                this.currentAnimation = 0;
            }
            this.image = this.animation[this.currentAnimation];

            return () => {
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
    }
}