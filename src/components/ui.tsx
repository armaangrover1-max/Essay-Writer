import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

function cx(...parts: (string | false | undefined | null)[]): string {
  return parts.filter(Boolean).join(' ')
}

export { cx }

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
}

const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition ' +
  'disabled:opacity-40 disabled:pointer-events-none select-none'

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-ink hover:opacity-90 active:opacity-80',
  secondary: 'border border-line bg-surface text-ink hover:border-ink-faint',
  ghost: 'text-ink-soft hover:text-ink hover:bg-sunk',
  danger: 'border border-line text-missing hover:bg-sunk',
}

const BUTTON_SIZES = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-sm px-4 py-2.5',
  lg: 'text-base px-6 py-3',
}

export function Button({ variant = 'secondary', size = 'md', className, ...rest }: ButtonProps) {
  return (
    <button
      className={cx(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className)}
      {...rest}
    />
  )
}

export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx('rounded-xl border border-line bg-surface', className)}
      {...rest}
    />
  )
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border border-line-soft bg-sunk',
        'px-2.5 py-0.5 text-xs tracking-wide text-ink-soft',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function PageTitle({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <header className="mb-8">
      <h1 className="font-display text-3xl sm:text-4xl">{children}</h1>
      {sub ? <p className="mt-2 max-w-2xl text-ink-soft">{sub}</p> : null}
    </header>
  )
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
      {children}
    </h2>
  )
}

export function Empty({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-line px-5 py-8 text-center text-sm text-ink-soft">
      {children}
    </p>
  )
}
