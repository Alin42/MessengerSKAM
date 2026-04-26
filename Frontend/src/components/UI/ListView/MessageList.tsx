import Message from "./Message";
import styles from "./message.module.css";

type Message = {
  id: number;
  content: string;
  isOwn: boolean;
  senderName?: string;
  timestamp?: string;
};

type MessageListProps = {
  messages: Message[];
};

function MessageList({ messages }: MessageListProps) {
  return (
    <div className={styles.messageList}>
      {messages
        .filter(Boolean)
        .map((msg) => (
          <Message key={msg.id} {...msg} />
        ))}
    </div>
  );
}

export default MessageList;