import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ChatFrame from "../components/Frames/User/Chat";
import ChatSelector from "../components/Frames/User/ChatSelector"
import EmptyChatFrame from "../components/Frames/User/EmptyChat"
import MinimalHeader from "../components/UI/Header/MinimalHeader";
import MinimalFooter from "../components/UI/Footer/MinimalFooter";

import styles from "./user.module.css"
import Settings from "../components/Frames/Settings/Settings";

const cookies = new Cookies();

function UserPage() {
  const navigate = useNavigate()
  const session_token = cookies.get('session_token')

  useEffect(() => {
  if (!session_token) {
    navigate("/auth")
  }
  }, [session_token, navigate]);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [chatFrame, setFrame] = useState(() => {return(<EmptyChatFrame/>)})
  return(
    <div>
          <Settings 
              isOpen={isSettingsOpen} 
              onClose={() => setIsSettingsOpen(false)}
          />
          <div className={styles.background}>
              <MinimalHeader/>
              <main className={styles.main}>
                  <ChatSelector onSelect={(chatToken) => {setFrame(() => {return(<ChatFrame token={chatToken}/>)})}} session_token={session_token} openSettings={() => setIsSettingsOpen(true)}/>
                  {chatFrame}
              </main>
              <MinimalFooter/>
          </div>
      </div>
  )
}
export default UserPage