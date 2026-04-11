import Label from '../../UI/Label/Label';
import styles from './frame.module.css';

function EmptyChatFrame() {

  return (
    <div className={styles.Empty}>
      <Label>Выберите чат чтобы отправить сообщение</Label>
    </div>
  );
}

export default EmptyChatFrame;