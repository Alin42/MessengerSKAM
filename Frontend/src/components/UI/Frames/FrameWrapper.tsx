import clsx from 'clsx'
import styles from './Frame.module.css'

type FrameWrapperProps = {
  children: React.ReactNode
  icon?: React.ReactNode
  variant : "welcome" | "signIn" | "registration"
}

export function FrameWrapper({ children, icon, variant }: FrameWrapperProps) {
  return (
    <div className={clsx(styles.Frame, variant && styles[variant])}>
      {icon && <div className={styles.icons}>{icon}</div>}
      {children}
    </div>
  )
}