import Button from "../Buttons/Button/Button.tsx"
import styles from "./footer.module.css"

function RoomFooter(){
    return(
        <footer className={styles.footer}>
          <div className={styles.footerButtons}>
             <Button onClick={() => console.log("Support requested")} theme="dark">Support</Button>
          </div>
        </footer>
    )
}
export default RoomFooter