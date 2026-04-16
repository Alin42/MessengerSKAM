import { useState } from 'react'
import MessageList from '../ListView/MessageList'
import MessageInput from '../Input/MessageInput'
import Label from '../Label/Label'

function Post() {
  const [messages, setMessages] = useState<string[]>([])

  const addMessage = (message : string) => {
    setMessages([...messages, message])
  }

  return (
    <div>
      <MessageList messages={messages}/>
      <Label>Введите сообщение:</Label>
      <MessageInput onSend={addMessage}/>
    </div>
  )
}

export default Post
