import styles from './label.module.css'
import clsx from 'clsx'

type Variant = 'title' | 'subtitle' | 'body' | 'caption'
type Color = 'primary' | 'white' | 'black' | 'muted' | 'aurora' | 'danger'

type LabelProps = {
  children: React.ReactNode
  variant?: Variant
  color?: Color
}

function Label({children, variant = 'body', color = 'white'}: LabelProps) {
  return (
    <p
      className={clsx(
        styles.label,
        styles[`label--${variant}`],
        styles[`label--${color}`]
      )}
    >
      {children}
    </p>
  )
}

export default Label