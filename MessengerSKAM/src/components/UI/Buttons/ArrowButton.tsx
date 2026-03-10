import Button from "./Button"
import "./arrowButton.css"
import ArrowIcon, { type ArrowIconProps } from "./icons/ArrowIcon"

type ArrowButtonProps = ArrowIconProps & {
  onClick: () => void
  direction: "left" | "right"
}

function ArrowButton({ onClick, direction, size = 30, color = "white" }: ArrowButtonProps) {
  return (
    <Button onClick={onClick} className="arrow-button">
      <ArrowIcon size={size} color={color} direction={direction} />
    </Button>
  )
}

export default ArrowButton