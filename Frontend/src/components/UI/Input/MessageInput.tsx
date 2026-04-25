import { useEffect, useRef, useState } from "react"
import Button from "../Buttons/Button/Button"
import StaplerButton from "../Buttons/Button/StaplerButton"
import AttachmentMenu, { type AttachmentMenuItems } from "../../Frames/Menu/AttachmentMenu"

import styles from "./message.module.css"

type MessageInputProps = {
  onSend: (message: string) => void
}

function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const [isAttachmentMenuOpen, openAttachmentMenu] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!message.trim()) return
    onSend(message)
    setMessage("")
  }

  const updateHeight = (el: HTMLTextAreaElement) => {
    console.log(el)
    el.style.height = "auto"
    el.style.height = `calc(${el.scrollHeight}px - 1em)`
  }

  const handleChange = (el: HTMLTextAreaElement) => {
    setMessage(el.value)
  }
  
  useEffect(() => {
    if (textareaRef.current) {
      updateHeight(textareaRef.current)
    }
  }, [message])

  const toggleAttachmentMenu = () => {
    openAttachmentMenu(isAttachmentMenuOpen? false : true)
  }

  const handleMenuItem = (selection: AttachmentMenuItems) => {
    switch (selection) {
      case "file":
        // FIXME: file input
        break
      case "foto":
        // FIXME: photo input
        break
      case "location":
        // FIXME: get geo
        break
      default:
        break
    }
  }

  return (
    <div className={styles.messageInputWrapper}>
      <div>
        {isAttachmentMenuOpen? <AttachmentMenu onSelect={handleMenuItem}/> : null}
        <StaplerButton onClick={toggleAttachmentMenu}></StaplerButton>
      </div>
      <textarea
        ref={textareaRef}
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
