import P5Canvas from "components/P5Canvas"
import lifegame from "components/sketches/lifegame"

export default function Home() {
  return (
    <>
      <P5Canvas sketch={lifegame} fillColor={199} />
    </>
  )
}
  