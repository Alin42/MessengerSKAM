import { useState } from 'react';
import TriplebarButton from '../../UI/Buttons/Button/TriplebarButton';
import SearchInput from '../../UI/Input/SearchInput';
import ChatList from '../../UI/ListView/ChatList';

import styles from './frame.module.css';
import type { ChatModel } from '../../../types/chat';

type ChatSelectorFrameProps = {
  onSelect: (chat: ChatModel) => void;
  changeChatState: (state: boolean) => void;
  chatState: boolean;
  selectedId: number | null;
  openSettings: () => void;
};

function ChatSelectorFrame({ onSelect, changeChatState, chatState, selectedId, openSettings }: ChatSelectorFrameProps) {
  const [regex, setRegex] = useState("");

  return (
    <div className={styles.chatSelector}>
      <div className={styles.toolBar}>
        <TriplebarButton onClick={openSettings} />
        <SearchInput onChange={setRegex} />
      </div>

      <ChatList
        onSelect={onSelect}
        updateChatState={changeChatState}
        chatState={chatState}
        selectedId={selectedId}
        filter={regex}
      />
    </div>
  );
}

export default ChatSelectorFrame;