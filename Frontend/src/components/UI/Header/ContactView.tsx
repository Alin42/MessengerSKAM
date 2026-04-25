import TripledotButton from "../Buttons/Button/TripledotButton.tsx";
import ChatCircle from "../Icon/ChatCircle.tsx"
import Label from "../Label/Label.tsx"

import styles from "./header.module.css"

type ContactViewProps = {
    chatColor: string,
    chatName: string
}

function ContactView({chatColor, chatName}: ContactViewProps) {
    return(
        <header className={`${styles.header} ${styles['colored']}`}>
            <ChatCircle color={chatColor}/>
            <div className={styles.minChatText}>
                <Label variant="subtitle">{chatName}</Label>
            </div>
            <TripledotButton onClick={function (): void {
                throw new Error("Function not implemented.");
            } }/>
        </header>
    )
}
export default ContactView