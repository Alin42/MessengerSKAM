import Label from '../../UI/Label/Label';
import Button from '../../UI/Buttons/Button/Button';
import Icon from '../../UI/Icon/Icon';
import { FrameWrapper } from './FrameWrapper';

import styles from './frame.module.css';

type WelcomeFrameProps = {
  onAction: (step: 'SignIn' | 'Registration') => void;
};

function WelcomeFrame({ onAction }: WelcomeFrameProps) {
  return (
    <FrameWrapper>
       {/* HEADER */}
      <div className={styles.header}>
        <Icon type="logo2" size={40} />
      </div>
       {/* BODY */}
      <div className={styles.body}>
        <div className={styles.labels}>
          <Label variant="title">Anonymous</Label>
          <Label variant="title">Messenger</Label>
        </div>
        <div className={styles.rowControllers}>
          <Button onClick={() => onAction('Registration')}>
            Create account
          </Button>
          <Button onClick={() => onAction('SignIn')}>
            I have an account
          </Button>
        </div>
      </div>
       {/* FOOTER */}
      <div className={styles.footer}>
        <Label color="primary" variant="caption">
          Talk freely. No accounts required.
        </Label>
      </div>
    </FrameWrapper>
  );
}

export default WelcomeFrame;