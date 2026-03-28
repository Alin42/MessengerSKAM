import { useId } from "react"
import "./lineEdit.css"

export type LineEditProps = {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  size?: "small" | "medium" | "large"
  theme?: "blue"
  id?: string
  name?: string
  type?: "text" | "password"
}

function LineEdit({ value, onChange, placeholder = "", size = "medium", theme = "blue", id, name, type = "text"}: LineEditProps) {
  const autoId = useId()

  return (
    <input
        id={id ?? autoId}
        name={name ?? "input"}
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        className={`line-edit ${size} ${theme}`}
      />
  )
}

export default LineEdit