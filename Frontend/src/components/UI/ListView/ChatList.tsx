import { API_CHATS } from "../../../api/config";
import type { APIChat, ChatModel } from "../../../types/chat";
import styles from "./lists.module.css";
import MinChat from "./MinChat";
import { useState, useEffect } from "react";
import { api } from "../../../api/api";

type ChatListProps = {
  onSelect: (chat: ChatModel) => void;
  selectedId?: number | null;
  filter: string;
};

function ChatList({ onSelect, selectedId, filter }: ChatListProps) {
  const [chats, setChats] = useState<ChatModel[]>([]);

  const getChats = async () => {
    try {
      const res = await api.get(API_CHATS);
      const apiChats: APIChat[] = res.data || [];

      const normalized: ChatModel[] = apiChats.map((chat) => ({
        id: chat.id,
        type: chat.type,
        name: chat.name ?? "Unnamed chat", // TODO: wat dat
        token: chat.chat_token ?? "",
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

  var regexp = new RegExp(filter.toLowerCase());

  return (
    <ul className={styles.chatlist}>
      {chats.map((chat) => (
        <MinChat
          key={chat.id}
          chat={chat}                
          selected={selectedId === chat.id}
          onClick={onSelect}
        />
      )).filter((elem) => {
        return elem.key == selectedId ||
        regexp.test(elem.props.chat.name.toLowerCase())
      })}
    </ul>
  );
}

export default ChatList;