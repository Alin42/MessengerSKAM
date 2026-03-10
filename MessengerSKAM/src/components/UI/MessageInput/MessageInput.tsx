import { useState } from "react"
import Button from "../Buttons/Button"

type MessageInputProps = {
  onSend: (message: string) => void
}

function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (!message.trim()) return
    onSend(message)
    setMessage("")
  }

  return (
    <div className="post component">
      <textarea
        placeholder="Сообщение..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={handleSend} label="Отправить" />
    </div>
  )
}

export default MessageInput