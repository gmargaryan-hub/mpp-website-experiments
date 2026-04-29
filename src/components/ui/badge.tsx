import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[#00C2FF]/15 text-[#00C2FF] border border-[#00C2FF]/30',
        teal: 'bg-[#00E5A0]/15 text-[#00E5A0] border border-[#00E5A0]/30',
        surface: 'bg-[#111827] text-[#F0F4FF] border border-white/10',
        muted: 'bg-white/5 text-[#6B7280] border border-white/5',
        danger: 'bg-[#FF4D6D]/15 text-[#FF4D6D] border border-[#FF4D6D]/30',
        outline: 'border border-white/20 text-[#F0F4FF] bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
