import { useEffect, useImperativeHandle, useState, forwardRef } from "react";
import Message from "./Message";
import styles from './message.module.css';

import { api } from '../../../api/api';
import { API_MESSAGES } from '../../../api/config';

type MessageListProps = {
  chat_id: number;
};

export type MessageListRef = {
  refetch: () => void;
};

const MessageList = forwardRef<MessageListRef, MessageListProps>(
  ({ chat_id }, ref) => {
    const [messages, setMessages] = useState<any[]>([]);

    const getMessages = async () => {
    try {
      const res = await api.get(API_MESSAGES(chat_id));

      const sorted = [...res.data.messages].sort(
        (a, b) => b.id - a.id
      );

      setMessages(sorted);
    } catch (err) {
      console.log(err);
    }
  };

    useEffect(() => {
      getMessages();
    }, [chat_id]);

    useImperativeHandle(ref, () => ({
      refetch: getMessages,
    }));

    return (
      <div className={styles.messageList}>
        {messages.map((msg) => (
          <Message key={msg.id} {...msg} />
        ))}
      </div>
    );
  }
);

export default MessageList;