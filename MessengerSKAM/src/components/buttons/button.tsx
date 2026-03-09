import "./button.css"

type ButtonProps = {
  onClick: () => void
  className? : "button" | "arrow-button"
  children?: React.ReactNode
  size? : "small" | "medium" | "large" 
  color? : "blue" | "dark"  
}

function Button({ onClick, className = "button", children, size = "medium", color = "blue" }: ButtonProps) {
  return (
    <button className={`${className} ${size} ${color}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button