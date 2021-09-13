import { CustomP5 } from "src/others/CustomP5";

export default interface RendererComponent {
    setup(p:CustomP5):void;

    render(p:CustomP5):void;

    update(p:CustomP5):void;
}