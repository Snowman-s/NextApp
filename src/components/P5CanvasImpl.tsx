import { CustomP5, CustomP5Props } from "src/others/CustomP5";
import React, { useEffect, useRef } from "react";

import p5 from "p5";

export default function P5Canvas(props: CustomP5Props) {
  const parentRef = useRef();
  const p5Inst = useRef<CustomP5>(null);

  useEffect(() => {
    killP5(p5Inst.current);
    p5Inst.current = new p5(props.sketch, parentRef.current);
  }, [props.sketch]);

  useEffect(() => {
    if (p5Inst.current == null) return;

    if (props.saveRequire) {
      p5Inst.current.onSave?.();
      props.onSaveEnd?.();
    }
    if (props.restartRequire) {
      p5Inst.current.onRestart?.();
      props.onRestartEnd?.();
    }
    p5Inst.current.onPropsUpdate?.(props);
  }, [props, p5Inst]);

  useEffect(
    () => () => {
      killP5(p5Inst.current);
      p5Inst.current = null;
    },
    []
  );

  return (
    <div style={{ position: "relative" }}>
      <div ref={parentRef} style={{ position: "absolute", zIndex: -1 }}></div>
      {props.children}
    </div>
  );
}

async function killP5(p5: CustomP5 | null) {
  if (p5 == null) return;

  while (!(p5 as unknown as { _setupDone: boolean })._setupDone) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }

  console.error("Kill", (p5 as unknown as { _setupDone: boolean })._setupDone);
  p5.remove();
}
