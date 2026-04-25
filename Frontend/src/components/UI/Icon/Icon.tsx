// Icon.tsx
import logo1 from './Icon/logo1.svg'
import logo2 from './Icon/logo2.svg'
import rose from './Icon/rose.svg'
import bin from './Icon/bin.svg'
import file from './Icon/file.svg'
import foto from './Icon/foto.svg'
import location from './Icon/location.svg'
import stapler from './Icon/staple.svg'
import eye from './Icon/warlock-eye.svg'
import add from './Icon/add.svg'
import rem from './Icon/rem.svg'

import styles from './icon.module.css'

const icons = {
  logo1,
  logo2,
  rose,
  bin,
  file,
  foto,
  location,
  stapler,
  eye,
  add,
  rem,
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