import { CustomP5 } from "src/others/CustomP5";

export default abstract class Scene {
    abstract init(p5: CustomP5):void

    abstract update(p5: CustomP5):void

    abstract draw(p5: CustomP5):void

    requiredScene : Scene = null;

    protected requireScene(scene:Scene){
        this.requiredScene = scene;
    }

    getRequiredScene(){
        return this.requiredScene;
    }
}