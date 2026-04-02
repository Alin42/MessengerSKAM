import BaseButton from '../BaseButton'
import ArrowIcon from '../ArrowIcons/ArrowIcon'

type ArrowButtonProps = {
  onClick: () => void
  direction?: "left" | "right"
}

function ArrowButton({ onClick, direction = "left" }: ArrowButtonProps) {
  return (
    <BaseButton onClick={onClick} variant="arrow" size="sm">
      <ArrowIcon direction={direction} />
    </BaseButton>
  )
}

export default ArrowButton