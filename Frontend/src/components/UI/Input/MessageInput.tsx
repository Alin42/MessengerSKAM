import { useState } from "react"
import Button from "../Buttons/Button/Button"
import StaplerButton from "../Buttons/Button/StaplerButton"
import AttachmentMenu from "../../Frames/Menu/AttachmentMenu"

import styles from "./message.module.css"

type MessageInputProps = {
  onSend: (message: string) => void
}

function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const [isAttachmentMenuOpen, openAttachmentMenu] = useState(false)

  const handleSend = () => {
    if (!message.trim()) return
    console.log(message)
    onSend(message)
    setMessage("")
    // FIXME: resize textarea here
    // FIXME: go backend
  }

  const updateHeight = (el: HTMLTextAreaElement) => {
    el.style.height = "auto"
    el.style.height = `calc(${el.scrollHeight}px - 1em)`
  }

  const handleChange = (el: HTMLTextAreaElement) => {
    setMessage(el.value)
    updateHeight(el)
  }

  const toggleAttachmentMenu = () => {
    openAttachmentMenu(isAttachmentMenuOpen? false : true)
  }

  return (
    <div className={styles.messageInputWrapper}>
      <div>
        {isAttachmentMenuOpen? <AttachmentMenu onSelect={function (selected: string): void {
          throw new Error("Function not implemented.")
        } }/> : null}
        <StaplerButton onClick={toggleAttachmentMenu}></StaplerButton>
      </div>
      <textarea
        className={styles.messageInput}
        placeholder="Сообщение..."
        value={message}
        onChange={(e) => handleChange(e.target as HTMLTextAreaElement)}
      />
      <Button onClick={handleSend}>Отправить</Button>
    </div>
  )
}

export default MessageInput
