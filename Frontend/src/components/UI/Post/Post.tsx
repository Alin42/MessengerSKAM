import { useState } from 'react'
import MessageList from '../MessageList/MessageList'
import MessageInput from '../MessageInput/MessageInput'

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
