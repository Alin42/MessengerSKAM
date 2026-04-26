import { useRef } from "react";
import ContactView from '../../UI/Header/ContactView';
import MessageList from '../../UI/ListView/MessageList';
import MessageInput from '../../UI/Input/MessageInput';

import styles from './frame.module.css';
import type { ChatModel } from '../../../types/chat';

type ChatFrameProps = {
  chat: ChatModel;
};

function ChatFrame({ chat }: ChatFrameProps) {
  // const [login, setLogin] = useState('');
  // const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);
  const messageListRef = useRef<{ refetch: () => void }>(null);

  const handleSend = () => {
    messageListRef.current?.refetch();
  };
  
  return (
    <div className={styles.chat}>
      <ContactView
        chatColor={chat.chatColor || "pink"}
        chatName={chat.name}
      />
      <MessageList
        ref={messageListRef}
        chat_id={chat.id}
      />
      <MessageInput
        chat_id={chat.id}
        onSend={handleSend}
      />
    </div>
  );
}

export default ChatFrame;  
