import Label from '../../UI/Label/Label';
import styles from './frame.module.css';

function EmptyChatFrame() {

  return (
    <div className={styles.empty}>
      <Label>Выберите чат чтобы отправить сообщение</Label>
    </div>
  );
}

export default EmptyChatFrame;