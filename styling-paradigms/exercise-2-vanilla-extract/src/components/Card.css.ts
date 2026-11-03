import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const card = style({
  padding: vars.spacing.large,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.large,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
})