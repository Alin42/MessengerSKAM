import { useState } from 'react';
import ContactView from '../../UI/Header/ContactView';
import MessageList from '../../UI/ListView/MessageList';
import MessageInput from '../../UI/Input/MessageInput';

import styles from './frame.module.css';

type ChatFrameProps = {
  token: string
}

function ChatFrame({ token }: ChatFrameProps) {
  const [login, setLogin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.body}>
      <ContactView chatColor='pink' chatName='hehe'/>
      <MessageList token='000'/>
      <MessageInput onSend={() => {}}/>
    </div>
  );
}

export default ChatFrame;