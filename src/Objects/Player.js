import characterPicture from './Assets/character.png'
import { DynamicObject } from '../Engine/Scripts/DynamicObject'

const Player = new DynamicObject();
Player.image = characterPicture
Player.isPlayer = true;
Player.width = 80;

export default Player