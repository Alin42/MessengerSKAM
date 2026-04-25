import { useState } from "react";
import TripledotButton from "../Buttons/Button/TripledotButton.tsx";
import ChatCircle from "../Icon/ChatCircle.tsx"
import Label from "../Label/Label.tsx"
import ChatMenu, { type ChatMenuItems }  from "../../Frames/Menu/ChatMenu.tsx";

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

  const handleMenuItem = (selection: ChatMenuItems) => {
    switch (selection) {
      case "add":
        // FIXME: add adding of a user
        break
      case "rem":
        // FIXME: add removal of a user
        break
      case "bin":
        // FIXME: send delete chat
        break
      default:
        break
    }
  }

  return(
    <header className={`${styles.header} ${styles['colored']}`}>
        <ChatCircle color={chatColor? chatColor : "var(--c-bg-special)"}/>
        <div className={styles.minChatText}>
            <Label variant="subtitle">{chatName}</Label>
        </div>
        <div className="rightButton">
            {isChatMenuOpen? <ChatMenu onSelect={handleMenuItem}/> : null}
            <TripledotButton onClick={toggleChatMenu}></TripledotButton>
        </div>
    </header>
  )
}
export default ContactView