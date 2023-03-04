import { Engine } from './Engine/Scripts/Renderer';
import { DynamicObject, UnWalkableObject } from './Engine/Scripts/GameObjects'

const tile2 = new DynamicObject(undefined, 
    (function(){
        let result = [];
        for(let i=0;i<=100;i=i+2){
            result.push([50,100+i])
        }
        return result;
    })()
)

const tile1 = new DynamicObject(undefined, 
    (function(){
        let result = [];
        for(let i=0;i<=100;i=i+2){
            result.push([250,300+i])
        }
        return result;
    })()
)


const tile3 = new DynamicObject(undefined, 
    (function(){
        let result = [];
        for(let i=0;i<=100;i=i+2){
            result.push([300+i, 400])
        }
        return result;
    })()
)


Engine.addObjects(tile2);
Engine.addObjects(tile1);
Engine.addObjects(tile3);



setInterval(() => {
    if (Engine.isInitialized) { Engine.update(); }
    else {
        Engine.initialze()
    }
}, 100)

window.addEventListener('keypress', (e) => { Engine.controlInput(e) }, true)



