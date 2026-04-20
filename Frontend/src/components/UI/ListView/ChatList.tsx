import axios from "axios"
import { API_URL } from "../../../api/config"
import styles from "./lists.module.css"
import MinChat from "./MinimizedChat"
import { useState } from "react"

type ChatListProps = {
    onSelect: (token: string) => void
    session_token: string
    selectedId?: number
}

type MinChatProps = {
  chatColor: string
  chatName: string
  msg?: string
  selected?: boolean
  token: string
}

function ChatList({onSelect, session_token} : ChatListProps){
    console.log(session_token)

  const [chats, setChats] = useState<MinChatProps[]>([]);
  const [selectedId, setSelected] = useState<number|null>(null);
    console.log(selectedId)

  const getChats = async () => {
    try {
        const chs = await axios.get(`${API_URL}/api/chats`, {
        headers: {
            'Authorization': `Bearer ${session_token}`
        }
        });
      setChats(chs.data.chats);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(chats);
    // FIXME: get chats by token
    /*const chats: MinChatProps[] = [
    {
        chatColor: "pink",
        chatName: "AAA",
        msg: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        selected: false,
        token: "1234-5678-9000"
    },
    {
        chatColor: "blue",
        chatName: "BBB",
        msg: "heheheheeh",
        selected: false,
        token: "1234-5678-9001"
    },
    {
        chatColor: "red",
        chatName: "CCCCC",
        selected: false,
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
                }} chatId={idx} {...chat}/>
            )}
        </ul>
    )
}
export default ChatList