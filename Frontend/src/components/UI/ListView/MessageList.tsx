import type { MessageProps } from "./Message";
import Message from "./Message";
import styles from './message.module.css';

type MessageListProps = {
  token: string
}

function MessageList({ token } : MessageListProps) {

  // FIXME: get Messages by chat token
  const messages: MessageProps[] = [ // AI generated :/
    {
      content: { type: "text", text: "Hello! How are you?" },
      isOwn: false,
      senderName: "Alice",
      timestamp: "10:30 AM"
    },
    {
      content: { type: "image", src: "/path/to/image.jpg", alt: "Photo" },
      isOwn: true
    },
    {
      content: { type: "text", text: "Looking great! 😊" },
      isOwn: true,
      timestamp: "10:32 AM"
    }
  ];
  return (
    <div className={styles.messageList}>
      {messages.map((msg, index) => (
        <Message key={index} {...msg} />
      ))}
    </div>
  );
}
export default MessageList;