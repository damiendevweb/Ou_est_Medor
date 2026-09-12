import { forwardRef } from 'react'

const baseClasses = 'w-full px-3 py-2 rounded border border-border text-text-primary text-sm focus:border-accent focus:ring-0 placeholder:text-text-secondary'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', ...props }, ref) => (
        <input
            ref={ref}
            className={`${baseClasses} ${className}`}
            {...props}
        />
    )
)
Input.displayName = 'Input'

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className = '', ...props }, ref) => (
        <textarea
            ref={ref}
            className={`${baseClasses} resize-none ${className}`}
            {...props}
        />
    )
)
Textarea.displayName = 'Textarea'
