import "./arrowIcon.css"

export type ArrowIconProps = {
  size?: number
  color?: "white" | "black" | "blue"
  direction?: "left" | "right"
}

const paths = {
  right: "M12 9 l8 7 -8 7",
  left: "M18 9 l-8 7 8 7",
}

function ArrowIcon({size = 30, color = "white", direction = "right",
}: ArrowIconProps) {
  return (
    <svg
      className={`arrow-icon ${direction} ${color}`}
      viewBox="0 0 30 30"
      width={size}
      height={size}
    >
      <path d={paths[direction]} />
    </svg>
  )
}
export default ArrowIcon