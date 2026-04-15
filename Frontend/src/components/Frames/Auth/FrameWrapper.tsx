import styles from './frame.module.css'

type FrameWrapperProps = {
  children: React.ReactNode
}

export function FrameWrapper({ children}: FrameWrapperProps) {
  return (
    <div className={styles.frame}>
      {children}
    </div>
  )
}

export default FrameWrapper