import type { HTMLAttributes, ReactNode } from 'react'
import * as styles from './Badge.css'

type BadgeVariant = 'success' | 'warning' | 'error'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  children: ReactNode
}

function Badge({
  variant = 'success',
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`} {...props}>
      {children}
    </span>
  )
}

export default Badge