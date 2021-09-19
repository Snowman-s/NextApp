import { CollectionsTwoTone } from "@material-ui/icons";
import { CustomP5 } from "src/others/CustomP5";
import RandomChoice from "src/others/RandomChoice";
import GradationCircle from "./backgrounds/GradationCircle";
import RedWhiteStripe from "./backgrounds/RedWhiteStripe";
import CrackerEffect from "./effects/CrackerEffect";
import Crapping from "./effects/Crapping";
import RendererComponent from "./RendererComponent";
import FallStringEffects from "./strings/FallStringEffect";
import FountainStringEffects from "./strings/FountainStringEffect";

export default function celebrate(p: CustomP5){
    let happiness = 50;
    let celebrateString = "なにかしあわせなこと";

    const backgroundRendererCandidates:(() => RendererComponent)[] = [
        () => new GradationCircle(),
        () => new RedWhiteStripe(happiness)
    ];
    const stringRendererCandidates:(() => RendererComponent)[] = [
        () => new FallStringEffects(happiness, celebrateString),
        () => new FountainStringEffects(happiness, celebrateString)
    ];
    const effectRendererCandidates:(() => RendererComponent)[] = [
        () => new CrackerEffect(happiness),
        () => new Crapping(happiness)
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
        backgroundRenderers = [backgroundRendererCandidates[p.int(p.random(backgroundRendererCandidates.length))]()]
        stringRenderers = [stringRendererCandidates[p.int(p.random(stringRendererCandidates.length))]()]

        effectRenderers = (RandomChoice.choice(effectRendererCandidates, p.int(happiness/50) + 1, max => p.int(p.random(max)))).map(t=>t());

        backgroundRenderers.forEach(renderer => renderer.setup(p));
        effectRenderers.forEach(renderer => renderer.setup(p));
        stringRenderers.forEach(renderer => renderer.setup(p));
    }
}