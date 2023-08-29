import { CustomP5, CustomP5Props } from "src/others/CustomP5";
import React, { useEffect, useRef } from "react";

import p5 from "p5";
import dynamic from "next/dynamic";

export default dynamic(() => import("./P5CanvasImpl"), {
  ssr: false,
});
