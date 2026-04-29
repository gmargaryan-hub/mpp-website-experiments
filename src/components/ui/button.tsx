'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0E1A] disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-[#00C2FF] text-[#0A0E1A] hover:bg-[#00A8E0] shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_30px_rgba(0,194,255,0.5)] active:scale-[0.98]',
        outline:
          'border border-[#00C2FF]/50 text-[#00C2FF] bg-transparent hover:bg-[#00C2FF]/10 hover:border-[#00C2FF] active:scale-[0.98]',
        ghost:
          'text-[#F0F4FF] bg-transparent hover:bg-white/5 active:scale-[0.98]',
        secondary:
          'bg-[#111827] text-[#F0F4FF] border border-white/10 hover:border-[#00C2FF]/30 hover:bg-[#1a2235] active:scale-[0.98]',
        teal:
          'bg-[#00E5A0] text-[#0A0E1A] hover:bg-[#00cc8e] shadow-[0_0_20px_rgba(0,229,160,0.3)] hover:shadow-[0_0_30px_rgba(0,229,160,0.5)] active:scale-[0.98]',
        danger:
          'bg-[#FF4D6D] text-white hover:bg-[#e6435f] active:scale-[0.98]',
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded-md',
        default: 'h-10 px-5',
        lg: 'h-12 px-7 text-base',
        xl: 'h-14 px-8 text-lg rounded-xl',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
