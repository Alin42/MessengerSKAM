import { useEffect, useRef, useState, type ChangeEvent } from "react";
import Button from "../Buttons/Button/Button";
import StaplerButton from "../Buttons/Button/StaplerButton";
import AttachmentMenu, { type AttachmentMenuItems } from "../../Frames/Menu/AttachmentMenu";

import styles from "./message.module.css";

type MessageInputProps = {
  onSend?: (message: string) => void;
};

function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [acceptingFileType, setAcceptingFileType] = useState("*");
  const [fileSelected, selectFile] = useState("");
  const [isAttachmentMenuOpen, setAttachmentMenuOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    selectFile(file.name);
  };

  const handleAttachment = (attachment: AttachmentMenuItems) => {
    if (attachment == 'file') {
      setAcceptingFileType("*")
      fileInputRef.current?.click();
    } else if (attachment == 'foto') {
      setAcceptingFileType("image/*")
      fileInputRef.current?.click();
    } else if (attachment == 'location') {
      console.log("not implimented")
    }
  };

  // FIXME: send a file to backend here 
  useEffect(()=> {}, [fileSelected]);

  const handleSendMsg = () => {
    if (!message.trim()) return;
    onSend?.(message);
    setMessage("");
  };

  const updateHeight = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = `calc(${el.scrollHeight}px - 1em)`; // pls don't remove :'(
  };

  useEffect(() => {
    if (textareaRef.current) {
      updateHeight(textareaRef.current);
    }
  }, [message]);

  const toggleAttachmentMenu = () => {
    setAttachmentMenuOpen(!isAttachmentMenuOpen);
  };

  // TODO: uncomment it later
  /*const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };*/

  return (
    <div className={styles.messageInputWrapper}>
      <div>
        {isAttachmentMenuOpen && (
          <AttachmentMenu onSelect={handleAttachment} />
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptingFileType}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <StaplerButton onClick={toggleAttachmentMenu} />
      </div>

      <textarea
        ref={textareaRef}
        className={styles.messageInput}
        placeholder="Сообщение..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        /*onKeyDown={handleKeyDown}*/
      />

      <Button onClick={handleSendMsg}>Отправить</Button>
    </div>
  );
}

export default MessageInput;