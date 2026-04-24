import BaseButton from '../BaseButton'

type ButtonProps = {
  onClick: () => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  theme?: 'blue' | 'dark'
  children?: React.ReactNode
}

function Button({props, ...ps}: any) {
  return <BaseButton variant="primary" {...props} {...ps}/>
}

export default Button