import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const badge = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: `${vars.spacing.small} ${vars.spacing.medium}`,
  borderRadius: vars.radius.pill,
  fontSize: vars.typography.small,
  fontWeight: 600,
})

export const success = style({
  backgroundColor: '#dcfce7',
  color: vars.color.success,
})

export const warning = style({
  backgroundColor: '#fef3c7',
  color: vars.color.warning,
})

export const error = style({
  backgroundColor: '#fee2e2',
  color: vars.color.error,
})