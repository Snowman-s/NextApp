import P5Canvas from "src/components/P5Canvas"
import lifegame from "src/components/sketches/lifegame"

export default function Home() {
  return (
    <>
      <P5Canvas sketch={lifegame} fillColor={199} />
    </>
  )
}
  