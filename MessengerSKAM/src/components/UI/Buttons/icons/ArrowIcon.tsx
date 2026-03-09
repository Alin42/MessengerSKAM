import "./arrowIcon.css"

export type ArrowIconProps = {
  direction?: "left" | "right"
  size?: number
  color?: "white" | "black" | "blue"
}

function ArrowIcon({ direction = "right", size = 30, color = "white" }: ArrowIconProps) {
  return (
    <svg
      className={`arrow-icon ${direction} ${color}`}
      viewBox="0 0 30 30"
      width={size}
      height={size}
    >
      <path d="M12 9l8 7-8 7" />
    </svg>
  )
}

export default ArrowIcon