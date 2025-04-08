'use client'

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'surface' | 'primary' | 'secondary' | 'error'
}

export function Box({ variant = 'default', className, ...props }: BoxProps) {
  const variantClasses = {
    default: 'bg-background',
    surface: 'bg-surface',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    error: 'bg-error text-white'
  }

  return (
    <div
      className={`rounded-lg p-4 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'primary' | 'secondary' | 'error'
}

export function Text({ variant = 'primary', className, ...props }: TextProps) {
  const variantClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    error: 'text-error'
  }

  return (
    <p
      className={`${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}