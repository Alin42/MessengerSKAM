import styles from './button.module.css'
import clsx from 'clsx'

type BaseButtonProps = {
  onClick: () => void
  disabled?: boolean
  variant?: 'primary' | 'icon' | 'iconBg'
  size?: 'sm' | 'md' | 'lg'
  theme?: 'blue' | 'dark'
  children?: React.ReactNode
}

function BaseButton({onClick, disabled = false, variant = 'primary', size = 'md', theme = 'blue', children}: BaseButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        theme === 'dark' && styles['button--dark']
      )}
    >
      {children}
    </button>
  )
}

export default BaseButton