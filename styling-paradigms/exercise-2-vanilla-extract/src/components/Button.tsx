import type { ButtonHTMLAttributes } from 'react'
import * as styles from './Button.css'

type ButtonVariant = 'primary' | 'secondary' | 'danger'
type ButtonSize = 'small' | 'large'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

function Button({
  variant = 'primary',
  size = 'large',
  children,
  ...props
}: ButtonProps) {
  const variantClass = styles[variant]
  const sizeClass = styles[size]

  return (
    <button
      className={`${styles.button} ${variantClass} ${sizeClass}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button