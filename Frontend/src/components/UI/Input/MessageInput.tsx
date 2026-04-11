import { useState } from "react"
import Button from "../Buttons/Button/Button"
import styles from "./textarea.module.css"

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
  }

  return (
    <div className={styles.messageInputWrapper}>
      <textarea
        className={styles.messageInput}
        placeholder="Сообщение..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={handleSend}>Отправить</Button>
    </div>
  )
}

export default MessageInput