// Icon.tsx
import logo1 from './Icon/logo1.svg'
import logo2 from './Icon/logo2.svg'
import rose from './Icon/rose.svg'

import styles from './icon.module.css'

const icons = {
  logo1,
  logo2,
  rose,
} as const

export type IconName = keyof typeof icons

export type IconProps = {
  type: IconName
  size?: number | string
  className?: string
}

function Icon({ type, size = 24, className }: IconProps) {
  const src = icons[type]

  return (
    <img
      src={src}
      alt={type}
      width={size}
      height={size}
      className={`${styles.icon} ${className ?? ''}`}
    />
  )
}

export default Icon