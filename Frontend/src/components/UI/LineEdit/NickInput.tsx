import "./lineEdit.css"
import { useId } from "react"

type NickInputProps = {
  value?: string
  onChange: (value: string) => void
  hidden?: boolean
  size?: "small" | "medium" | "large"
  theme?: "blue"
  id?: string
  name?: string
}

function NickInput({ value, onChange, hidden = false, size = "medium", theme = "blue", id, name }: NickInputProps) {
  const autoId = useId()
  return (
    <input
      id={id ?? autoId}
      name={name ?? "nick"}
      value={value}
      placeholder="Login"
      onChange={(e) => onChange(e.target.value)}
      className={`line edit ${hidden ? "hidden" : ""} ${size} ${theme}`}
    />
  )
}

export default NickInput