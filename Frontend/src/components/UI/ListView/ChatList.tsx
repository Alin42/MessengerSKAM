import { API_CHATS } from "../../../api/config";
import styles from "./lists.module.css";
import MinChat from "./MinimizedChat";
import { useState, useEffect } from "react";
import { api } from "../../../api/api";

type ChatListProps = {
  onSelect: (token: string) => void;
  selectedId?: number;
  filter: string;
};


type ApiChat = {
  id: number;
  type?: "group" | "contact";
  chatColor?: string;
  chatName?: string | null;
  msg?: string;
  token?: string | null;
};

type ChatModel = {
  id: number;
  type?: "group" | "contact";
  chatColor?: string;
  chatName: string;
  msg: string;
  token: string;
};

function ChatList({ onSelect, filter }: ChatListProps) {
  const [selectedId, setSelected] = useState<number | null>(null);
  const [chats, setChats] = useState<ChatModel[]>([]);

  const getChats = async () => {
    try {
      const res = await api.get(API_CHATS);

      const apiChats: ApiChat[] = res.data || [];

      const normalized: ChatModel[] = apiChats.map((chat) => ({
        id: chat.id,
        type: chat.type,
        chatColor: chat.chatColor,
        chatName: chat.chatName ?? "Unnamed chat",
        msg: chat.msg ?? "",
        token: chat.token ?? "",
      }));

      setChats(normalized);
    } catch (err) {
      console.log("GET CHATS ERROR:", err);
      setChats([]);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  const search = filter?.toLowerCase() || "";

  const filteredChats = chats.filter((chat) =>
    chat.chatName.toLowerCase().includes(search)
  );

  return (
    <ul className={styles.chatlist}>
      {filteredChats.map((chat) => (
        <MinChat
        key={chat.id}
        chatId={chat.id}
        selected={selectedId === chat.id}
        chatName={chat.chatName}
        chatColor={chat.chatColor}
        msg={chat.msg}
        onClick={() => {
            setSelected(chat.id);
            onSelect(chat.token); 
        }}
        />
      ))}
    </ul>
  );
}

export default ChatList;