import { CustomP5Props } from "src/others/CustomP5";
import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";

/*
export default class P5Canvas extends React.Component<
  CustomP5Props,
  { p5obj: CustomP5 }
> {
  myRef: React.RefObject<HTMLDivElement>;
  canvasRef: React.RefObject<HTMLDivElement>;

  constructor(props: CustomP5Props) {
    super(props);
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
      <div style={{ position: "relative" }}>
        <div
          ref={this.canvasRef}
          style={{ position: "absolute", zIndex: -1 }}
        ></div>
        {this.props.children}
      </div>
    );
  }
}
*/

export default function P5Canvas(props: CustomP5Props) {
  const parentRef = useRef();

  const [p5Inst, setP5Inst] = useState(null);

  useEffect(() => {
    const asyncInst = async function () {
      const newP5Inst = new p5(props.sketch, parentRef.current);
      setP5Inst(newP5Inst);
    };
    asyncInst();
  }, [props.sketch]);

  useEffect(() => {
    if (p5Inst == null) return;

    if (props.saveRequire) {
      p5Inst.onSave?.();
      p5Inst.onSaveEnd?.();
    }
    if (props.restartRequire) {
      p5Inst.onRestart?.();
      p5Inst.onRestartEnd?.();
    }
    p5Inst.onPropsUpdate?.(props);
  }, [props, p5Inst]);

  useEffect(
    () => () => {
      if (p5Inst) p5Inst.remove();
    },
    [p5Inst]
  );

  return (
    <div style={{ position: "relative" }}>
      <div ref={parentRef} style={{ position: "absolute", zIndex: -1 }}></div>
      {props.children}
    </div>
  );
}
