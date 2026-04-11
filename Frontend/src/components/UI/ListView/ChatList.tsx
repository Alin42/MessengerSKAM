import styles from "./lists.module.css"
import MinChat from "./MinimizedChat"

type ChatListProps = {
    onSelect: (token: string) => void
    token: string
    selectedId?: number
}

type MinChatProps = {
  chatColor: string
  chatName: string
  msg?: string
  selected?: boolean
  token: string
}

function ChatList({onSelect, token, selectedId=-1} : ChatListProps){
    console.log(token)
    console.log(selectedId)
    // FIXME: get chats by token
    const chats: MinChatProps[] = [
    {
        chatColor: "pink",
        chatName: "AAA",
        msg: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
    ];
    return (
        <ul className={styles.chatlist}>
            {chats.map((chat, idx) => 
                <MinChat key={`chat-${idx}`} onClick={(id) => {
                    console.log(id)
                    onSelect(chats[id].token)
                }} chatId={idx} {...chat}/>
            )}
        </ul>
    )
}
export default ChatList