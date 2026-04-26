import type { MessageModel } from "../../../types/message";
import Message from "./Message";
import styles from "./message.module.css";

type MessageListProps = {
  messages: MessageModel[];
};

function MessageList({ messages }: MessageListProps) {
  return (
    <div className={styles.messageList}>
      {messages.map((msg) => (
        <Message key={msg.id} {...msg} />
      ))}
    </div>
  );
}

export default MessageList;