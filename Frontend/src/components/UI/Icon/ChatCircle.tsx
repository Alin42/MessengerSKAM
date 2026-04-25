import styles from './icon.module.css'

export type ChatCircleProps = {
  color: string
  size?: number | string
  className?: string
}         

function ChatCircle({ color, size = 60, className }: ChatCircleProps) {
  return (
                           
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" fill={color}/>
    </svg>
    /*<img
      color={color}
      src={src}
      alt='icon'
      width={size}
      height={size}
      className={`${styles.icon} ${className ?? ''}`}
    />*/
  )
}

export default ChatCircle