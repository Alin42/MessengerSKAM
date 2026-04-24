import styles from './buttonIcon.module.css'

type TripledotIconProps = {
  size?: number
}

function TripledotIcon({ size = 30 }: TripledotIconProps) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 30 30"
      width={size}
      height={size}
      color="white"
    >
      <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor"/>
      <circle cx="1.5" cy="7.5" r="1.5"/>
      <circle cx="1.5" cy="13.5" r="1.5"/>
    </svg>
  )
}
export default TripledotIcon