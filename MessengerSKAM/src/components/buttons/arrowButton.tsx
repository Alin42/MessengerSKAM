import Button from "./button"
import "./arrowButton.css"

type ArrowButtonProps = {
  onClick: () => void
  direction: "right" | "left"
}

const arrows = {
  left: "←",
  right: "→"
}

function ArrowButton({ onClick, direction }: ArrowButtonProps) {
  return (
    <Button onClick={onClick} className="arrow-button">
      {arrows[direction]}
    </Button>
  )
}

export default ArrowButton