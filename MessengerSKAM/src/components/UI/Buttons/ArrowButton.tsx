import Button from "./Button"
import "./arrowButton.css"
import ArrowIcon, { type ArrowIconProps } from "./icons/ArrowIcon"

type ArrowButtonProps = ArrowIconProps & {
  onClick: () => void
}

function ArrowButton({ onClick, direction = "right", size = 30, color = "white" }: ArrowButtonProps) {
  return (
    <Button onClick={onClick} className="arrow-button">
      <ArrowIcon direction={direction} size={size} color={color} />
    </Button>
  )
}

export default ArrowButton