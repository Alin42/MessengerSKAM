import axios from "axios"
import { API_CHATS } from "../../../api/config"
import styles from "./lists.module.css"
import MinChat from "./MinimizedChat"
import { useState } from "react"

type ChatListProps = {
    onSelect: (token: string) => void
    session_token: string
    selectedId?: number
}

type MinChatProps = {
  chatColor?: string
  chatName: string
  msg?: string
  token: string
}

function ChatList({onSelect, session_token} : ChatListProps){
    console.log(session_token)

  const [selectedId, setSelected] = useState<number|null>(null);
    console.log(selectedId)

  const [chats, setChats] = useState<MinChatProps[]>([]);
  const getChats = async () => {
    try {
        const chs = await axios.get(API_CHATS, {
        headers: {
            'Authorization': `Bearer ${session_token}`
        }
        });
      setChats(chs.data.chats);
    } catch (err) {
      console.log(err);
    }
  };
  getChats();
  console.log(chats);
    // FIXME: get chats by token
    /*const chats: MinChatProps[] = [
    {
        chatColor: "pink",
        chatName: "AAA",
        msg: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        token: "1234-5678-9000"
    },
    {
        chatName: "BBB",
        msg: "heheheheeh",
        token: "1234-5678-9001"
    },
    {
        chatColor: "red",
        chatName: "CCCCC",
        token: "1234-5678-9002"
    }
    ];*/
    return (
        <ul className={styles.chatlist}>
            {chats.map((chat, idx) => 
                <MinChat key={`chat-${idx}`} onClick={(id) => {
                    setSelected(id)
                    getChats()
                    console.log(id)
                    onSelect(chats[id].token)
                }} chatId={idx} selected={selectedId == idx} {...chat}/>
            )}
        </ul>
    )
}
export default ChatList