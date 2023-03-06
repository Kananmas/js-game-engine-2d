import { Engine } from './Engine/Scripts/Engine';
import { DynamicObject } from './Engine/Scripts/DynamicObject';
import { Obsticale } from './Engine/Scripts/Obsticale';

const player = new DynamicObject();
const Enemy = new DynamicObject(undefined, undefined);
Enemy.setPostion([400, 400])
const tile = new Obsticale([500, 300]);

player.applyCustomStyles({
    backgroundColor: 'red',
})


player.isPlayer = true;

Engine.addObjects([player, Enemy, tile])

let int = 0;
setInterval(() => {
    if (Engine.isInitialized) {
        Engine.update();
        // ++int;
        // console.log(int)
        // if (int % 320 == 0) {
        //     const values = Object.entries(Engine.gridMap)

        //     values.map((element) => {
        //         if (element[1].owner) {
        //             console.log(element[0], element[1].owner.isPlayer)
        //         }
        //         return element
        //     })
        // }
    }
    else {
        Engine.initialze()
    }
}, 50)

window.addEventListener('keypress', (e) => { Engine.controlInput(e) }, true)



