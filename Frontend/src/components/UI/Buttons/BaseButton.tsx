import "./button.css"

type BaseButtonProps = {
  onClick: () => void
  disabled? : boolean
  variant : "primary" | "arrow"
  size? : "small" | "medium" | "large" 
  theme? : "blue" | "dark"
  children?: React.ReactNode  
}

function BaseButton({ onClick, disabled = false, variant = "primary", size = "medium", theme = "blue", children }: BaseButtonProps) {
  const className = `button ${variant} ${size} ${theme}`
  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {children}
    </button>
  )
}

export default BaseButton