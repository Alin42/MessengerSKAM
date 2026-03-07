import React from "react"
import Post from "./components/Post/App";


const App: React.FC = () => {
   return (
    <div>
      <h1>Учебный мессенджер</h1>
      <p>Здесь будут сообщения</p>
      <Post />
    </div>
  )
}

export default App