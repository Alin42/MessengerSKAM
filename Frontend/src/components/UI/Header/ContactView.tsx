import { useState } from "react";
import TripledotButton from "../Buttons/Button/TripledotButton.tsx";
import ChatCircle from "../Icon/ChatCircle.tsx"
import Label from "../Label/Label.tsx"
import ChatMenu from "../../Frames/Menu/ChatMenu.tsx";

import styles from "./header.module.css"

type ContactViewProps = {
    chatColor?: string,
    chatName: string
}

function ContactView({chatColor, chatName}: ContactViewProps) {
  const [isChatMenuOpen, openChatMenu] = useState(false)
  const toggleChatMenu = () => {
    openChatMenu(isChatMenuOpen? false : true)
  }
  return(
    <header className={`${styles.header} ${styles['colored']}`}>
        <ChatCircle color={chatColor? chatColor : "var(--c-bg-special)"}/>
        <div className={styles.minChatText}>
            <Label variant="subtitle">{chatName}</Label>
        </div>
        <div className="rightButton">
            {isChatMenuOpen? <ChatMenu onSelect={function (selected: string): void {
            throw new Error("Function not implemented.")
            } }/> : null}
            <TripledotButton onClick={toggleChatMenu}></TripledotButton>
        </div>
    </header>
  )
}
export default ContactView