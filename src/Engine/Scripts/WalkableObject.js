import { GameObject } from "./GameObject";

export class WalkableObject extends GameObject {
    constructor(args) {
        super(args);
        this.objectType = 'solid-walkable'
    }
}