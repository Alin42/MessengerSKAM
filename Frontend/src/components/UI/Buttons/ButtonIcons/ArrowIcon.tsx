import styles from './buttonIcon.module.css'

const paths = {
  right: 'M12 9 l8 7 -8 7',
  left: 'M18 9 l-8 7 8 7',
}

type ArrowIconProps = {
  size?: number
  direction?: 'left' | 'right'
}

function ArrowIcon({ size = 30, direction = 'right' }: ArrowIconProps) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 30 30"
      width={size}
      height={size}
    >
      <path d={paths[direction]} />
    </svg>
  )
}
export default ArrowIcon