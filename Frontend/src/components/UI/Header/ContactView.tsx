import ChatCircle from "../Icons/ChatCircle.tsx"
import Label from "../Label/Label.tsx"

import styles from "./header.module.css"
import clsx from 'clsx';

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
        </header>
    )
}
export default ContactView