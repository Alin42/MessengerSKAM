import { useEffect, useState } from "react";
import ContactView from "../../UI/Header/ContactView";
import MessageList from "../../UI/ListView/MessageList";
import MessageInput from "../../UI/Input/MessageInput";

import styles from "./frame.module.css";
import type { ChatModel } from "../../../types/chat";
import type { APIMessage, MessageModel } from "../../../types/message";
import { API_MESSAGES } from "../../../api/config";
import { api } from "../../../api/api";

type ChatFrameProps = {
  chat: ChatModel;
  UserID: number; 
};

function ChatFrame({ chat, UserID }: ChatFrameProps) {
  const [messages, setMessages] = useState<MessageModel[]>([]);

  const loadMessages = async () => {
    try {
      const res = await api.get(API_MESSAGES(chat.id));
      const raw = Array.isArray(res.data.messages)
        ? res.data.messages
        : [];

      const sorted = [...raw].sort((a, b) => b.id - a.id); // FIXME: (for future) -- no need to do that if backend sends in correct order (css style reverses)
      const normalized: MessageModel[] = sorted.map((message: APIMessage) => ({
        id: message.id,
        content: message.content,
        isOwn: message.sender_id === UserID, // FIXED // FIXME: compare with api/me .id here
        senderName: message.sender_name,
        timestamp: message.created_at,
      }));
      setMessages(normalized);
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
      console.log("SEND ERROR:", err);
    }
  };

  return (
    <div className={styles.chat}>
      <ContactView
        chatColor={chat.chatColor}
        chatName={chat.name}
      />
      <MessageList messages={messages} />
      <MessageInput
        onSend={handleSend}
      />
    </div>
  );
}

export default ChatFrame;