import { GameObject } from "./GameObject";

export class WalkableObject extends GameObject {
    constructor() {
        super();
        this.objectType = 'solid-walkable'
    }
}