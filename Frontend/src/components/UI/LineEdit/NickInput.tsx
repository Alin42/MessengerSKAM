import "./lineEdit.css"

type NickInputProps = {
  hidden?: boolean
  size?: "small" | "medium" | "large"
  theme?: "blue"
}

function NickInput({ hidden = true, size = "medium", theme = "blue" }: NickInputProps) {
  return (
    <input placeholder="Login" className={`line edit ${hidden} ${size} ${theme}`}/>
  )
}

export default NickInput