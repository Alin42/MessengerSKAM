import "./button.css"

type ButtonProps = {
    onClick: () => void
    label: string
    size? : "small" | "medium" | "large"
    color? : "blue" | "dark"
}

function Button({ onClick, label, size = "medium", color = "blue" }: ButtonProps) {
  return (
    <button className={`button ${size} ${color}`} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button