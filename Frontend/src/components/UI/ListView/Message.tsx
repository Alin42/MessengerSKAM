import type { MessageModel } from "../../../types/message";
import styles from "./message.module.css";

function Message({ content, isOwn, senderName, timestamp }: MessageModel) {

  return (
    <div className={`${styles.messageContainer} ${isOwn ? styles.own : styles.other}`}>
      <div className={isOwn ? styles.messageOwn : styles.messageOther}>
        {!isOwn && senderName && (
          <div className={styles.senderName}>{senderName}</div>
        )}
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