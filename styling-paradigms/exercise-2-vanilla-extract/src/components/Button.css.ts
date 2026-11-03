import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: vars.radius.medium,
  fontFamily: vars.typography.fontFamily,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, opacity 0.2s ease',

  ':focus-visible': {
    outline: '3px solid #818cf8',
    outlineOffset: '3px',
  },

  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
})

export const primary = style({
  backgroundColor: vars.color.primary,
  color: '#ffffff',

  ':hover': {
    backgroundColor: vars.color.primaryHover,
  },
})

export const secondary = style({
  backgroundColor: vars.color.secondary,
  color: vars.color.text,

  ':hover': {
    backgroundColor: '#d1d5db',
  },
})

export const danger = style({
  backgroundColor: vars.color.danger,
  color: '#ffffff',

  ':hover': {
    backgroundColor: '#b91c1c',
  },
})

export const small = style({
  padding: `${vars.spacing.small} ${vars.spacing.medium}`,
  fontSize: vars.typography.small,
})

export const large = style({
  padding: `${vars.spacing.medium} ${vars.spacing.large}`,
  fontSize: vars.typography.medium,
})