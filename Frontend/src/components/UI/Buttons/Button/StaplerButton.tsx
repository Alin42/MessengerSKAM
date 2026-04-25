import BaseButton from '../BaseButton'
import StaplerIcon from '../ButtonIcons/StaplerIcon'

type StaplerButtonProps = {
  onClick: () => void
}

function StaplerButton({ onClick }: StaplerButtonProps) {
  return (
    <BaseButton onClick={onClick} variant="icon" size="sm">
      <StaplerIcon />
    </BaseButton>
  )
}

export default StaplerButton