import "./button.css"
import BaseButton from "./BaseButton"

type ButtonProps = {
  onClick: () => void
  children?: React.ReactNode
  size?: "small" | "medium" | "large"
  theme?: "blue" | "dark"
}

function Button({ onClick, ...buttonProps }: ButtonProps) {
  return (
    <BaseButton variant="primary" onClick={onClick} {...buttonProps} />
  )
}

export default Button