import { CustomP5Props } from "src/others/CustomP5";
import React, { useEffect, useRef, useState } from "react";

export default function P5Canvas(props: CustomP5Props) {
  const parentRef = useRef();

  const [p5Inst, setP5Inst] = useState(null);

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    let instantNeeded = true;

    const asyncInst = async function () {
      const newP5Inst = new (await import("p5")).default(
        props.sketch,
        parentRef.current
      );
      if (instantNeeded) {
        setP5Inst(newP5Inst);
      } else {
        //setupDone=trueじゃないとremove()はだめだってさ
        while (!(newP5Inst as unknown as { _setupDone: boolean })._setupDone) {
          await sleep(10);
        }
        console.log(newP5Inst);
        newP5Inst.remove();
      }
    };
    asyncInst();

    return () => {
      instantNeeded = false;
    };
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
