import { useId } from 'react'
import styles from './input.module.css'
import clsx from 'clsx'

type Size = 'sm' | 'md' | 'lg'

type InputProps = {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  size?: Size
  type?: 'text' | 'password'
  name?: string
  id?: string
}

function LineEdit({value, onChange, placeholder = '', size = 'md', type = 'text', name, id}: InputProps) {
  const autoId = useId()

  return (
<div className={styles.inputWrapper}>
      <input
        id={id ?? autoId}
        name={name ?? 'input'}
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          styles.input,
          styles[`input--${size}`]
        )}
      />
    </div>
  )
}

export default LineEdit