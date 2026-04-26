import Label from "../../components/UI/Label/Label"
import styles from './centered.module.css'

function NotFound() {
   return (
    <div className={styles.centered}>
        <Label variant="title" color="white">404</Label>
        <Label variant="subtitle" color="white">Page not found</Label>
        <div></div>
        <Label color="primary"><a href="./auth">Return home</a></Label>
    </div>
  )
}

export default NotFound