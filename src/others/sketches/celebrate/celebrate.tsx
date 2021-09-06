import { CustomP5 } from "src/others/CustomP5";
import GradationCircle from "./backgrounds/GradationCircle";
import CrackerEffect from "./effects/CrackerEffect";
import RendererComponent from "./RendererComponent";
import FallStringEffects from "./strings/FallStringEffect";

export default function celebrate(p: CustomP5){
    let happiness = 50;
    let celebrateString = "なにかしあわせなこと";

    const backgroundRendererCandidates:(() => RendererComponent)[] = [
        () => new GradationCircle()
    ];
    const stringRendererCandidates:(() => RendererComponent)[] = [
        () => new FallStringEffects(happiness, celebrateString)
    ];
    const effectRendererCandidates:(() => RendererComponent)[] = [
        () => new CrackerEffect(happiness)
    ];

    let backgroundRenderers:RendererComponent[] = [

    ];
    let stringRenderers:RendererComponent[] = [

    ];
    let effectRenderers:RendererComponent[] = [

    ];

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
    }

    p.draw = () => {
        backgroundRenderers.forEach(renderer => renderer.update(p));
        effectRenderers.forEach(renderer => renderer.update(p));
        stringRenderers.forEach(renderer => renderer.update(p));

        p.background(0);
        backgroundRenderers.forEach(renderer => renderer.render(p));
        effectRenderers.forEach(renderer => renderer.render(p));
        stringRenderers.forEach(renderer => renderer.render(p));
    }

    p.onPropsUpdate = (props) => {
        happiness = props.happiness;
        celebrateString = props.celebrateString;

        initialize();
    }

    p.onRestart = () => {
        initialize();
    }

    p.onSave = () => {
        p.save("celebrate.png");
    }

    function initialize(){
        backgroundRenderers = [backgroundRendererCandidates[0]()]
        effectRenderers = [effectRendererCandidates[0]()]
        stringRenderers = [stringRendererCandidates[0]()]
    }
}