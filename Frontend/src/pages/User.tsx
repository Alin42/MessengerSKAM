import { useState, type JSX } from "react";
import { useNavigate } from "react-router";
import ChatFrame from "../components/Frames/User/Chat";
import ChatSelector from "../components/Frames/User/ChatSelector"
import EmptyChatFrame from "../components/Frames/User/EmptyChat"
import styles from "./user.module.css"

function UserPage() {
  // FIXME: get status and token from cookies
  const token = ''
  const isLoggedIn = true
  if (!isLoggedIn) {
    const navigate = useNavigate()
    navigate("/auth")
  }

  const [chatFrame, setFrame] = useState(() => {return(<EmptyChatFrame/>)})
  return(
      <div className={styles.UserPage}>
          <div className={styles.background}>
              <header></header>
              <main className={styles.main}>
                  <ChatSelector onSelect={(token) => {setFrame(() => {return(<ChatFrame token={token}/>)})}} token={token}/>
                  {chatFrame}
              </main>
              <footer></footer>
          </div>
      </div>
  )
}
export default UserPage