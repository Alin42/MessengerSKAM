import "./label.css"

type LabelProps = {
  children: React.ReactNode
  variant?: "title" | "subtitle" | "body" | "caption"
  color?: "white" | "black" | "blue"
}

function Label({ children, variant = "body", color = "white" }: LabelProps) {
  return (
    <p className={`label ${variant} ${color}`}>
      {children}
    </p>
  )
}

export default Label