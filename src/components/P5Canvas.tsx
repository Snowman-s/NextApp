import { CustomP5, CustomP5Props } from "src/others/CustomP5";
import React from "react";

export default class P5Canvas extends React.Component<
  CustomP5Props,
  { p5obj: CustomP5 }
> {
  myRef: React.RefObject<HTMLDivElement>;
  canvasRef: React.RefObject<HTMLDivElement>;

  constructor(props: CustomP5Props) {
    super(props);

    this.myRef = React.createRef();
    this.canvasRef = React.createRef();
  }

  async componentDidMount() {
    const p5 = await import("p5");
    const p5obj = new p5.default(
      this.props.sketch,
      this.canvasRef.current
    ) as CustomP5;
    this.setState({ p5obj: p5obj });
  }

  async componentDidUpdate(prevProps: any) {
    if (prevProps.sketch !== this.props.sketch) {
      this.state.p5obj.remove();
      const p5 = await import("p5");
      const p5obj = new p5.default(
        this.props.sketch,
        this.canvasRef.current
      ) as CustomP5;
      this.setState({ p5obj: p5obj });
    }
    if (this.props.saveRequire) {
      this.state.p5obj.onSave?.();
      this.props.onSaveEnd?.();
    }
    if (this.props.restartRequire) {
      this.state.p5obj.onRestart?.();
      this.props.onRestartEnd?.();
    }
    this.state.p5obj.onPropsUpdate?.(this.props);
  }

  render() {
    return (
      <div ref={this.myRef} style={{ position: "relative" }}>
        <div
          ref={this.canvasRef}
          style={{ position: "absolute", zIndex: -1 }}
        ></div>
        {this.props.children}
      </div>
    );
  }
}
