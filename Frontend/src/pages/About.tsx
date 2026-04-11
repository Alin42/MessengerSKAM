import Label from "../components/UI/Label/Label"
import styles from "./centered.module.css"

function About() {
   return (
    <div className={styles.centered}>
        <Label variant="title">About</Label>
        <Label variant="subtitle">Мессенджер Скам</Label>
    </div>
  )
}

export default About