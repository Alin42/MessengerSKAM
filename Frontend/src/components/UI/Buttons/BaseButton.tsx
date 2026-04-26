import { useSound } from '../../../hooks/useSound'
import styles from './button.module.css'
import clsx from 'clsx'

type BaseButtonProps = {
  onClick: () => void
  sounded?: boolean
  disabled?: boolean
  variant?: 'primary' | 'icon' | 'iconBg'
  size?: 'sm' | 'md' | 'lg'
  theme?: 'blue' | 'dark'
  children?: React.ReactNode
}

function BaseButton({onClick, sounded = false, disabled = false, variant = 'primary', size = 'md', theme = 'blue', children, ...props}: BaseButtonProps) {
  const [play] = useSound("beep");
  return (
    <button
      disabled={disabled}
      onClick={sounded? () => {play(), onClick()} : onClick}
      className={clsx(
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        theme === 'dark' && styles['button--dark']
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default BaseButton