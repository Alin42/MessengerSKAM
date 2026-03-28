import "./lineEdit.css"
import LineEdit  from "./LineEdit"

type NickInputProps = {
  value?: string
  onChange: (value: string) => void
  size?: "small" | "medium" | "large"
  theme?: "blue"
}

function NickInput({value, onChange, size, theme }: NickInputProps) {
  return (
    <LineEdit value={value} onChange={onChange} size={size} theme={theme} type="text" />
  )
}

export default NickInput