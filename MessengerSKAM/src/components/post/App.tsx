import { useState } from 'react'
import './App.css'

function Post() {
  const [message, updateMessage] = useState('')
  const [array, updateMessages] = useState(Array<string>())

  return (
    <>
    <div className="post">
      <ul>
        {array.map(array_i => (
          <li>{array_i}</li>
        ))}
      </ul>
      <h4>Введите сообщение:</h4>
      <div className="post component">
        <textarea defaultValue="Сообщение..." name="post userInput" onChange={val => updateMessage(val.target.value)}/>
        <button onClick={() => updateMessages([...array, message])}>
          Отправить
        </button>
      </div>
      </div>
    </>
  )
}

export default Post
