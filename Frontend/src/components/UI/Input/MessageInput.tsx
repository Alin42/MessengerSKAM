import { useEffect, useRef, useState } from "react";
import Button from "../Buttons/Button/Button";
import StaplerButton from "../Buttons/Button/StaplerButton";
import AttachmentMenu from "../../Frames/Menu/AttachmentMenu";

import styles from "./message.module.css";

type MessageInputProps = {
  chat_id: number;
  onSend?: (message: string) => void;
};

function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [isAttachmentMenuOpen, setAttachmentMenuOpen] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!message.trim()) return;

    onSend?.(message);

    setMessage("");
  };

  const updateHeight = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  useEffect(() => {
    if (textareaRef.current) {
      updateHeight(textareaRef.current);
    }
  }, [message]);

  const toggleAttachmentMenu = () => {
    setAttachmentMenuOpen(prev => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.messageInputWrapper}>
      <div>
        {isAttachmentMenuOpen && (
          <AttachmentMenu onSelect={() => {}} />
        )}

        <StaplerButton onClick={toggleAttachmentMenu} />
      </div>

      <textarea
        ref={textareaRef}
        className={styles.messageInput}
        placeholder="Сообщение..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Button onClick={handleSend}>Отправить</Button>
    </div>
  );
}

export default MessageInput;