import { Engine } from './Engine/Scripts/Engine';
import { DynamicObject } from './Engine/Scripts/DynamicObject';
import { Obsticale } from './Engine/Scripts/Obsticale';

const player = new DynamicObject();
const Enemy = new DynamicObject({}, undefined, (function () {
    let result = [];
    for (let i = 0; i < 100; i = i + 2) {
        result.push([400, 100 + i]);
    }
    return result;
})());
const tile = new Obsticale([700, 700]);

player.applyCustomStyles({
    backgroundColor: 'red',
})


player.isPlayer = true;

Engine.addObjects([player, Enemy, tile])

setInterval(() => {
    if (Engine.isInitialized) {
        Engine.update();
    }
    else {
        Engine.initialze()
    }
}, 50)

window.addEventListener('keypress', (e) => { Engine.controlInput(e) }, true)



