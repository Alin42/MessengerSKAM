import styles from './buttonIcon.module.css'

type TriplebarIconProps = {
  size?: number
}

function TriplebarIcon({ size = 30 }: TriplebarIconProps) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 30 30"
      width={size}
      height={size}
    >
      <path strokeWidth={3} d="M5 7 25 7 M5 15 25 15 M5 23 25 23"/>
    </svg>
  )
}
export default TriplebarIcon