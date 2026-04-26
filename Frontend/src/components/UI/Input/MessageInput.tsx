import { useEffect, useRef, useState } from "react";
import Button from "../Buttons/Button/Button";
import StaplerButton from "../Buttons/Button/StaplerButton";
import AttachmentMenu, { type AttachmentMenuItems } from "../../Frames/Menu/AttachmentMenu";

import styles from "./message.module.css";
import { api } from "../../../api/api";
import { API_MESSAGES } from "../../../api/config";

type MessageInputProps = {
  chat_id: number;
  onSend?: (message: string) => void;
};

function MessageInput({ chat_id, onSend }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [isAttachmentMenuOpen, setAttachmentMenuOpen] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (!message.trim()) return;

    const text = message;

    try {
      await api.post(API_MESSAGES(chat_id), {
        content: text,
      });

      onSend?.(text);

      setMessage("");
    } catch (err) {
      console.log("SEND MESSAGE ERROR:", err);
    }
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

  const handleMenuItem = (selection: AttachmentMenuItems) => {
    switch (selection) {
      case "file":
        break;
      case "foto":
        break;
      case "location":
        break;
    }
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
          <AttachmentMenu onSelect={handleMenuItem} />
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