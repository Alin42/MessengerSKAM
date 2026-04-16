import BaseButton from '../BaseButton'
import ArrowIcon from '../ButtonIcons/ArrowIcon'

type ArrowButtonProps = {
  onClick: () => void
  direction?: "left" | "right"
}

function ArrowButton({ onClick, direction = "left" }: ArrowButtonProps) {
  return (
    <BaseButton onClick={onClick} variant="iconBg" size="sm">
      <ArrowIcon direction={direction} />
    </BaseButton>
  )
}

export default ArrowButton