import BaseButton from '../BaseButton'
import TriplebarIcon from '../ButtonIcons/TripplebarIcon'

type TriplebarButtonProps = {
  onClick: () => void
}

function TriplebarButton({ onClick }: TriplebarButtonProps) {
  return (
    <BaseButton onClick={onClick} variant="icon" size="sm">
      <TriplebarIcon />
    </BaseButton>
  )
}

export default TriplebarButton