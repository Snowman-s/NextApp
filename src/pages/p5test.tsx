import P5Canvas from "src/components/P5Canvas"
import mysketch from "src/components/sketches/myfirstsketch"
import styles from '/styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <P5Canvas sketch={mysketch} />
    </div>
  )
}
  