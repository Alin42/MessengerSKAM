import Label from "../Label/Label";
import ChatCircle from "../Icon/ChatCircle";

import styles from "./lists.module.css";

type MinChatProps = {
  onClick: (chatId: number) => void;
  chatId: number;
  chatColor?: string;
  chatName?: string;
  msg?: string;
  selected?: boolean;
};

function MinChat({onClick, chatId, chatColor, chatName, msg = "Пока нет сообщений", selected = false}: MinChatProps) {
  return (
    <li
      onClick={() => onClick(chatId)}
      className={`${styles.minChat} ${selected ? styles.selected : ""}`}
    >
      <ChatCircle color={chatColor || "var(--c-bg-special)"} />

      <div className={styles.minChatText}>
        <Label variant="subtitle">
          {chatName || "Без названия"}
        </Label>
        <Label variant="body">{msg}</Label>
      </div>
    </li>
  );
}

export default MinChat;