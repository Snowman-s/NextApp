import dynamic from "next/dynamic";

export default dynamic(() => import("./P5CanvasImpl"), {
  ssr: false,
});
