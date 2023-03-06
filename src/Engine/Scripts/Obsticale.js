import { GameObject } from "./GameObject";
export class Obsticale extends GameObject {
    constructor(args) {
        super(args);
        this.objectType = 'solid-unwalkable'
    }
}
