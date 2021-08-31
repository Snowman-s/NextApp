import p5 from 'p5';
import {CustomP5} from 'src/others/CustomP5'
import Scene from './Scene';

import TitleScene from './TitleScene';

export default function undefinedcardgame(p: CustomP5) {
    let scene : Scene;

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);

        scene = new TitleScene();

        scene.init(p);
    }

    p.draw = () => {
        scene.update(p);

        scene.draw(p);

        if(scene.getRequiredScene() != null){
            scene = scene.getRequiredScene();
            scene.init(p);
        }
    }
}