import { useState } from "react"
import Button from "../Buttons/Button/Button"
import styles from "./textarea.module.css"
import StaplerButton from "../Buttons/Button/StaplerButton"

type MessageInputProps = {
  onSend: (message: string) => void
}

function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState("")

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
    el.style.height = `${el.scrollHeight}px`
  }

  const handleChange = (el: HTMLTextAreaElement) => {
    setMessage(el.value)
    updateHeight(el)
  }

  return (
    <div className={styles.messageInputWrapper}>
      <StaplerButton onClick={handleSend}></StaplerButton>
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
