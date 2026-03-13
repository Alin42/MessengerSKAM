import BaseButton from "./BaseButton"
import "./arrowButton.css"
import ArrowIcon, { type ArrowIconProps } from "./icons/ArrowIcon"

type ArrowButtonProps = ArrowIconProps & {
  onClick: () => void
}

function ArrowButton({ onClick, ...iconProps }: ArrowButtonProps) {
  return (
    <BaseButton onClick={onClick} variant="arrow">
      <ArrowIcon {...iconProps} />
    </BaseButton>
  )
}

export default ArrowButton