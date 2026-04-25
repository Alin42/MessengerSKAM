import { useState } from 'react';
import TriplebarButton from '../../UI/Buttons/Button/TriplebarButton';
import SearchInput from '../../UI/Input/SearchInput';
import ChatList from '../../UI/ListView/ChatList';

import styles from './frame.module.css';

type ChatSelectorFrameProps = {
  onSelect: (token: string) => void
  openSettings: () => void
}

function ChatSelectorFrame({ onSelect, openSettings } : ChatSelectorFrameProps) {
  const [regex, setRegex] = useState("");
  return (
    <div className={styles.chatSelector}>
        <div className={styles.toolBar}>
          <TriplebarButton onClick={openSettings}/>
          <SearchInput onChange={setRegex}/>
        </div>
        <ChatList onSelect={onSelect} filter={regex}></ChatList>
    </div>
  );
}

export default ChatSelectorFrame;