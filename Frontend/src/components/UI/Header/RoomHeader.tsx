import { useNavigate } from "react-router-dom"
import Button from "../Buttons/Button/Button.tsx"

import styles from "./header.module.css"

function RoomHeader(){
    let navigate = useNavigate();
    return(
        <header className={styles.header}>
          <div className={styles.headerButtons}>
            <Button onClick={() => {
               console.log("About requested")
               navigate("/about")
            }} theme="dark">About</Button>
            <a href="https://github.com/Alin42/MessengerSKAM">
               <Button onClick={() => {}} theme="dark">Github</Button>
            </a>
          </div>
        </header>
    )
}
export default RoomHeader