import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { API_ME } from "../../api/config";

import ChatFrame from "../../components/Frames/User/Chat";
import ChatSelector from "../../components/Frames/User/ChatSelector";
import EmptyChatFrame from "../../components/Frames/User/EmptyChat";
import Settings from "../../components/Frames/Settings/Settings";

import type { ChatModel } from "../../types/chat";
import styles from "./user.module.css";

type User = {
  id: number;
  username: string;
};

function UserPage() {
  const navigate = useNavigate();
  const sessionToken = localStorage.getItem("session_token");
  
  const [user, setUser] = useState<User | null>(null); 
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatModel | null>(null);

  useEffect(() => {
    if (!sessionToken) {
      navigate("/auth");
      return;
    }

    api.get(API_ME)
      .then(res => setUser(res.data))
      .catch(err => {
        console.log("GET ME ERROR:", err);
        localStorage.removeItem("session_token");
        navigate("/auth");
      });
  }, []); 

  if (!user) {
    return null; // UPDATE ME (Future) Loading
  }

  return (
    <div>
      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        user={user}
      />
      <div className={styles.background}>
        <main className={styles.main}>
          <ChatSelector
            onSelect={setSelectedChat}
            selectedId={selectedChat?.id ?? null}
            openSettings={() => setIsSettingsOpen(true)}
          />

          {selectedChat ? (
            <ChatFrame
              chat={selectedChat}
              UserID={user.id}
            />
          ) : (
            <EmptyChatFrame />
          )}
        </main>
      </div>
    </div>
  );
}

export default UserPage;