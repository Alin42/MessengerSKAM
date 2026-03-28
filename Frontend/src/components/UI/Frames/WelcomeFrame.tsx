import Label from '../Label/Label'
import Button from '../Buttons/Button/Button'
import Icon from '../Icons/Icon'
import { FrameWrapper } from './FrameWrapper'

import styles from './Frame.module.css'

type WelcomeFrameProps = {
  onAction: (step: 'SignIn' | 'Registration') => void
}

function WelcomeFrame({ onAction }: WelcomeFrameProps) {
  return (
    <FrameWrapper variant='welcome' icon={<Icon size={50} type="logo2" />}>
      <div className={styles.FrameCenter}>
        <div className={styles.labels}>
          <Label variant="title">Anonymous</Label>
          <Label variant="title">Messenger</Label>
        </div>
        <div className={styles.rowControllers}>
          <Button onClick={() => onAction('Registration')}>Create account</Button>
          <Button onClick={() => onAction('SignIn')}>I have an account</Button>
        </div>
        <Label color="primary" variant="caption">
          Talk freely. No accounts required.
        </Label>
      </div>
    </FrameWrapper>
  )
}
export default WelcomeFrame