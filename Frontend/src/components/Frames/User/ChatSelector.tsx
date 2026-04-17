import TriplebarButton from '../../UI/Buttons/Button/TriplebarButton';
import SearchInput from '../../UI/Input/SearchInput';
import ChatList from '../../UI/ListView/ChatList';

import styles from './frame.module.css';

type ChatSelectorFrameProps = {
  onSelect: (token: string) => void,
  session_token: string
}

function ChatSelectorFrame({ onSelect, session_token } : ChatSelectorFrameProps) {

  return (
    <div className={styles.chatSelector}>
        <div className={styles.toolBar}>
          <TriplebarButton onClick={() => {}}/>
          <SearchInput onChange={() => {}}/>
        </div>
        <ChatList onSelect={onSelect} session_token={session_token}></ChatList>
    </div>
  );
}

export default ChatSelectorFrame;