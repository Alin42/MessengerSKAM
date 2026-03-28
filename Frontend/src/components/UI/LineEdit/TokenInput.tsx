import "./lineEdit.css"
import LineEdit from "./LineEdit"
import { useState } from "react"

type TokenInputProps = {
  value?: string
  onChange: (value: string) => void
  size?: "small" | "medium" | "large"
  theme?: "blue"
}

function TokenInput({ value, onChange, size = "medium", theme = "blue"}: TokenInputProps) {
  const [visible, setVisible] = useState(true)
  const inputType = visible ? "text" : "password"

  return (
  <div className="line-edit-wrapper">
    <LineEdit
        value={value}
        onChange={onChange}
        type={inputType}
        size={size}
        theme={theme}
        placeholder="Token"
      />
      <button
        type="button"
        className="show-password-btn"
        onClick={() => setVisible(!visible)}
        >
        {visible ? "🙈" : "👁️"}
      </button>
    </div>
  )
}

export default TokenInput