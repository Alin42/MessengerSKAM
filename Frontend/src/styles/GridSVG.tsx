import styles from './gridSVG.module.css';

type GridSVGProps = {
  strokeColor?: string
  strokeWidth?: number
  gridSize?: number
  backgroundColor?: string
};

const COLOR = '#FFFFFF'
const WIDTH = 1
const SIZE = 30

function GridSVG({strokeColor = COLOR, strokeWidth = WIDTH, gridSize = SIZE}: GridSVGProps) {
  return (
    <svg
      className={styles.gridSVG}
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id="grid"
          width={gridSize}
          height={gridSize}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}
export default GridSVG