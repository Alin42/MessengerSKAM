import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatFrame from "../components/Frames/User/Chat";
import ChatSelector from "../components/Frames/User/ChatSelector"
import EmptyChatFrame from "../components/Frames/User/EmptyChat"
import MinimalHeader from "../components/UI/Header/MinimalHeader";
import MinimalFooter from "../components/UI/Footer/MinimalFooter";

import styles from "./user.module.css"
import Settings from "../components/Frames/Settings/Settings";

function UserPage() {

  const navigate = useNavigate()
  const sessionToken = localStorage.getItem("session_token");

  useEffect(() => {
  if (!sessionToken) {
    navigate("/auth")
  }
  }, [sessionToken, navigate]);

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
                  <ChatSelector 
                    onSelect={(chatToken) => {setFrame(() => {return(<ChatFrame token={chatToken}/>)})}}
                    openSettings={() => setIsSettingsOpen(true)}/>
                  {chatFrame}
              </main>
              <MinimalFooter/>
          </div>
      </div>
  )
}
export default UserPage