import styles from "./message.module.css";

type MessageContent = {
  type: "text";
  text: string;
} | {
  type: "image";
  src: string;
  alt?: string;
};

type MessageProps = {
  content: MessageContent;
  isOwn: boolean;
  senderName?: string;
  timestamp?: string;
};

function Message({ content, isOwn, senderName, timestamp }: MessageProps) {
  const isImage = content.type === "image";
  const messageClass = isOwn ? styles.messageOwn : styles.messageOther;

  return (
    <div className={`${styles.messageContainer} ${isOwn ? styles.own : styles.other}`}>
      <div className={messageClass}>
        {!isOwn && (
          <div className={styles.senderName}>{senderName}</div>
        )}
        <div className={styles.content}>
          {isImage ? (
            <img 
              src={content.src} 
              alt={content.alt || "Chat image"} 
              className={styles.messageImage}
            />
          ) : (
            <div className={styles.messageText}>{content.text}</div>
          )}
        </div>
        {timestamp && <div className={styles.timestamp}>{timestamp}</div>}
      </div>
    </div>
  );
}

export default Message;
export type {MessageProps};