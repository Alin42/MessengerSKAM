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
  return (
    <div className={styles.chat}>
      <ContactView chatColor={chat.chatColor || "pink"} chatName={chat.name} />
      <MessageList chat_id={chat.id} />
      <MessageInput onSend={(text) => console.log(text)} />
    </div>
  );
}

export default ChatFrame;  
