import BaseButton from '../BaseButton'

type ButtonProps = {
  onClick: () => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  theme?: 'blue' | 'dark'
  children?: React.ReactNode
}

function Button(props: ButtonProps) {
  return <BaseButton variant="primary" {...props} />
}

export default Button