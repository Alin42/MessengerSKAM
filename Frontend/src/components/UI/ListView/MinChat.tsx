import Label from "../Label/Label";
import ChatCircle from "../Icon/ChatCircle";

import styles from "./lists.module.css";
import type { ChatModel } from "../../../types/chat";

type MinChatProps = {
  onClick: (chat: ChatModel) => void;
  chat: ChatModel;
  selected?: boolean;
};

function MinChat({ onClick, chat, selected = false }: MinChatProps) {
  return (
    <li
      onClick={() => onClick(chat)}
      className={`${styles.minChat} ${selected ? styles.selected : ""}`}
    >
      <ChatCircle color={chat.chatColor || "var(--c-bg-special)"} />
      <div className={styles.minChatText}>
        <Label variant="subtitle">
          {chat.name || "Без названия"}
        </Label>
        <Label variant="body">
          {chat.msg || "Пока нет сообщений"}
        </Label>
      </div>
    </li>
  );
}

export default MinChat;