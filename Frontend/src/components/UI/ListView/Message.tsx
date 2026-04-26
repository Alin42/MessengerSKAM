import styles from "./message.module.css";

// export type MessageProps = {
//   id: number;
//   content: {
//     type: "text" | "image";
//     text?: string;
//     src?: string;
//     alt?: string;
//   };
//   isOwn: boolean;
//   senderName?: string;
//   timestamp?: string;
// };

export type MessageProps = {
  id: number
  content: string
  isOwn: boolean
  senderName?: string
  timestamp?: string
};

function Message({ content, isOwn, senderName, timestamp }: MessageProps) {
 
  // const isImage = content.type === "image";

  return (
    <div className={`${styles.messageContainer} ${isOwn ? styles.own : styles.other}`}>
      <div className={isOwn ? styles.messageOwn : styles.messageOther}>
        
        {!isOwn && senderName && (
          <div className={styles.senderName}>{senderName}</div>
        )}

        {/* <div className={styles.content}>
          {isImage ? (
            <img
              src={content.src}
              alt={content.alt || "image"}
              className={styles.messageImage}
            />
          ) : (
            <div className={styles.messageText}>
              {content.text}
            </div>
          )}
        </div> */}

        <div className={styles.messageText}>
              {content}
            </div>

        {timestamp && (
          <div className={styles.timestamp}>{timestamp}</div>
        )}
      </div>
    </div>
  );
}

export default Message;