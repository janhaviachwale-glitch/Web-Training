import { createTheme, createThemeContract } from '@vanilla-extract/css'

export const vars = createThemeContract({
  color: {
    primary: '',
    primaryHover: '',
    secondary: '',
    danger: '',
    text: '',
    textMuted: '',
    background: '',
    surface: '',
    border: '',
    success: '',
    warning: '',
    error: '',
  },
  spacing: {
    small: '',
    medium: '',
    large: '',
    xlarge: '',
  },
  typography: {
    fontFamily: '',
    small: '',
    medium: '',
    large: '',
    heading: '',
  },
  radius: {
    small: '',
    medium: '',
    large: '',
    pill: '',
  },
})

export const themeClass = createTheme(vars, {
  color: {
    primary: '#4f46e5',
    primaryHover: '#4338ca',
    secondary: '#e5e7eb',
    danger: '#dc2626',
    text: '#111827',
    textMuted: '#6b7280',
    background: '#f9fafb',
    surface: '#ffffff',
    border: '#e5e7eb',
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
    xlarge: '32px',
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    small: '12px',
    medium: '16px',
    large: '20px',
    heading: '28px',
  },
  radius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    pill: '999px',
  },
})