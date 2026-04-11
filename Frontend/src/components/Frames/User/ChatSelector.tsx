import TriplebarButton from '../../UI/Buttons/Button/TriplebarButton';
import SearchInput from '../../UI/Input/SearchInput';
import ChatList from '../../UI/ListView/ChatList';

import styles from './frame.module.css';

type ChatSelectorFrameProps = {
  onSelect: (token: string) => void,
  token: string
}

function ChatSelectorFrame({ onSelect, token } : ChatSelectorFrameProps) {

  return (
    <div className={styles.ChatSelector}>
        <div className={styles.ToolBar}>
          <TriplebarButton onClick={() => {}}/>
          <SearchInput onChange={() => {}}/>
        </div>
        <ChatList onSelect={onSelect} token={token}></ChatList>
    </div>
  );
}

export default ChatSelectorFrame;