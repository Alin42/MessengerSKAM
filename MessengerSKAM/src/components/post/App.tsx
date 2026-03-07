import { useState } from 'react'
import './App.css'
import MessageList from '../MessageList/messageList'
import MessageInput from '../MessageInput/messageInput'

function Post() {
  const [messages, setMessages] = useState<string[]>([])

  const addMessage = (message : string) => {
    setMessages([...messages, message])
  }

  return (
    <div>
      <MessageList messages={messages}/>
      <h4>Введите сообщение:</h4>
      <MessageInput onSend={addMessage}/>
    </div>
  )
}

export default Post
