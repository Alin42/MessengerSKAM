import BaseButton from '../BaseButton'
import TripledotIcon from '../ButtonIcons/TrippledotIcon'

type TripledotButtonProps = {
  onClick: () => void
}

function TripledotButton({ onClick }: TripledotButtonProps) {
  return (
    <BaseButton onClick={onClick} variant="icon" size="sm">
      <TripledotIcon />
    </BaseButton>
  )
}

export default TripledotButton