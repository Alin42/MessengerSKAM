import "./lineEdit.css"

type TokenInputProps = {
  hidden?: boolean
  size?: "small" | "medium" | "large"
  theme?: "blue"
}

function TokenInput({ hidden = true, size = "medium", theme = "blue" }: TokenInputProps) {
  return (
    <input type={hidden? "password":"text"} className={`line edit ${hidden} ${size} ${theme}`}/>
  )
}

export default TokenInput