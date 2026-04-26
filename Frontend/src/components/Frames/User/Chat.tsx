import { useEffect, useState } from "react";
import ContactView from "../../UI/Header/ContactView";
import MessageList from "../../UI/ListView/MessageList";
import MessageInput from "../../UI/Input/MessageInput";

import styles from "./frame.module.css";
import type { ChatModel } from "../../../types/chat";
import { API_MESSAGES } from "../../../api/config";
import { api } from "../../../api/api";

type Message = {
  id: number;
  content: string;
  isOwn: boolean;
  senderName?: string;
  timestamp?: string;
};

type ChatFrameProps = {
  chat: ChatModel;
};

function ChatFrame({ chat }: ChatFrameProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  const loadMessages = async () => {
    try {
      const res = await api.get(API_MESSAGES(chat.id));

      const raw = Array.isArray(res.data.messages)
        ? res.data.messages
        : [];

      const sorted = [...raw].sort((a, b) => b.id - a.id);

      setMessages(sorted);
    } catch (err) {
      console.log("LOAD MESSAGES ERROR:", err);
      setMessages([]);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [chat.id]);

  const handleSend = async (text: string) => {
    try {
      await api.post(API_MESSAGES(chat.id), {
        content: text,
      });

      await loadMessages();
    } catch (err) {
      console.log("SEND ERROR", err);
    }
  };

  return (
    <div className={styles.chat}>
      <ContactView
        chatColor={chat.chatColor || "pink"}
        chatName={chat.name}
      />
      <MessageList messages={messages} />
      <MessageInput
        chat_id={chat.id}
        onSend={handleSend}
      />
    </div>
  );
}

export default ChatFrame;