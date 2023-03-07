import { Engine } from './Engine/Scripts/Engine';
import Player from './Objects/Player'
import { wallObject } from './Objects/Wall';

Engine.addObjects([Player, wallObject])

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
}, 16.66)

window.addEventListener('keypress', (e) => { Engine.controlInput(e, 2) }, true)



