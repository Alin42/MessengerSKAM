import { useEffect, useState } from "react";
import Message, { type MessageProps } from "./Message";
import { api } from "../../../api/api";
import { API_MESSAGES } from "../../../api/config";
import type { APIMessage } from "../../../types/chat";

type MessageListProps = {
  chat_id: number;
};

function MessageList({ chat_id }: MessageListProps) {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const getMessages = async () => {
    try {
      const res = await api.get(API_MESSAGES(chat_id));
      const data: APIMessage[] = res.data?.messages || [];

      const mapped: MessageProps[] = data.map((msg) => ({
        id: msg.id,
        content: msg.content,
        isOwn: false, 
        senderName: msg.sender,
        timestamp: msg.created_at,
      }));

      setMessages(mapped);
    } catch (err) {
      console.log(err);
      setMessages([]);
    }
  };

  useEffect(() => {
    if (!chat_id) return;

    setMessages([]);
    getMessages();
  }, [chat_id]);

  return (
    <div>
      {messages.map((msg) => (
        <Message key={msg.id} {...msg} />
      ))}
    </div>
  );
}

export default MessageList;