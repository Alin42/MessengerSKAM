import "./button.css"
import BaseButton from "./BaseButton"

type ButtonProps = {
  onClick: () => void
  disabled? : boolean
  children?: React.ReactNode
  size?: "small" | "medium" | "large"
  theme?: "blue" | "dark"
}

function Button({ onClick, disabled=false, ...buttonProps }: ButtonProps) {
  return (
    <BaseButton disabled={disabled} variant="primary" onClick={onClick} {...buttonProps} />
  )
}

export default Button