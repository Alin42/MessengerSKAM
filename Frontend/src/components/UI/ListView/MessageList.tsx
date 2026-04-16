import axios from 'axios';
import { useState } from 'react';
import type { MessageProps } from "./Message";
import Message from "./Message";
import styles from './message.module.css';

import { API_URL } from '../../../api/config';

type MessageListProps = {
  chat_token: string
}

function MessageList({ chat_token } : MessageListProps) {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const getMessages = async () => {
    try {
      const ms = await axios.get(`${API_URL}/api/messages`);
      setMessages(ms.data);
    } catch (err) {
      console.log(err);
    }
  };
  getMessages();

  // FIXME: get Messages by chat token
  /*const messages: MessageProps[] = [ // AI generated :/
    {
      content: { type: "text", text: "Hello! How are you?" },
      isOwn: false,
      senderName: "Alice",
      timestamp: "10:30"
    },
    {
      content: { type: "image", src: "/path/to/image.jpg", alt: "Photo" },
      isOwn: true
    },
    {
      content: { type: "text", text: "Looking great! 😊" },
      isOwn: true,
      timestamp: "10:32"
    }
  ];*/
  return (
    <div className={styles.messageList}>
      {messages.map((msg, index) => (
        <Message key={index} {...msg} />
      ))}
    </div>
  );
}
export default MessageList;