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

/**
 * A full interaction ladder: rest, hover, press. The press state moves the
 * button a pixel rather than only changing its opacity, which is what makes a
 * control feel physical instead of painted on.
 */
const BUTTON_BASE =
  'group relative inline-flex items-center justify-center gap-2 rounded-lg font-medium ' +
  'transition-[transform,box-shadow,background-color,border-color,color] duration-150 ' +
  'ease-[var(--ease-soft)] active:translate-y-px ' +
  'disabled:opacity-40 disabled:pointer-events-none disabled:active:translate-y-0 select-none'

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  // The hairline and lit top edge stop the primary reading as a flat slab.
  primary:
    'bg-accent text-accent-ink e-1 e-lift ' +
    'border border-[color-mix(in_oklab,var(--c-accent)_78%,#000)] ' +
    'hover:-translate-y-px ' +
    'hover:brightness-[1.04] active:brightness-95 active:e-1',
  secondary:
    'border border-line bg-surface text-ink e-1 e-lift ' +
    'hover:border-ink-faint hover:-translate-y-px ' +
    'active:shadow-none',
  ghost: 'text-ink-soft hover:text-ink hover:bg-sunk',
  danger:
    'border border-line text-missing hover:bg-sunk ' +
    'hover:border-[color-mix(in_oklab,var(--c-missing)_45%,transparent)]',
}

const BUTTON_SIZES = {
  sm: 'text-sm px-3.5 py-1.5',
  md: 'text-sm px-4.5 py-2.5',
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

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Lifts on hover. Only for cards that are themselves a control. */
  interactive?: boolean
  elevation?: 1 | 2 | 3
}

/**
 * The lit top edge is the whole trick: a one-pixel highlight along the top
 * makes a surface read as catching light from above, which is what separates
 * a card from a rectangle of slightly different colour.
 */
export function Card({ className, interactive, elevation = 1, ...rest }: CardProps) {
  return (
    <div
      className={cx(
        'relative rounded-xl border border-line bg-surface',
        'before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px',
        'before:rounded-t-xl before:bg-[var(--edge-lit)]',
        elevation === 1 && 'e-1',
        elevation === 2 && 'e-2',
        elevation === 3 && 'e-3',
        interactive &&
          'transition-[transform,box-shadow,border-color] duration-200 ease-[var(--ease-soft)] ' +
            'hover:-translate-y-0.5 hover:border-ink-faint ',
        className,
      )}
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

interface SegmentedOption<T extends string> {
  value: T
  label: ReactNode
}

/**
 * Replaces a row of buttons where one is filled solid. A quiet track with a
 * single raised selection reads as one control rather than several competing
 * ones, and it is far less shouty than an accent-filled rectangle.
 */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: readonly SegmentedOption<T>[]
  value: T
  onChange: (next: T) => void
  label: string
  className?: string
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cx(
        'inline-flex rounded-xl border border-line-soft bg-sunk p-1',
        'e-inset',
        className,
      )}
    >
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={cx(
              'rounded-lg px-3.5 py-1.5 text-sm transition-all duration-200 ease-[var(--ease-soft)]',
              selected
                ? 'bg-surface text-ink e-1 font-medium'
                : 'text-ink-soft hover:text-ink',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

/** A figure and its caption. Lining tabular numerals, never monospace. */
export function Stat({
  value,
  label,
  accent,
}: {
  value: ReactNode
  label: ReactNode
  accent?: boolean
}) {
  return (
    <div>
      <div
        className={cx(
          'tnum font-display text-3xl leading-none sm:text-4xl',
          accent ? 'text-accent' : 'text-ink',
        )}
      >
        {value}
      </div>
      <div className="mt-1.5 text-xs tracking-wide text-ink-faint">{label}</div>
    </div>
  )
}

export function PageTitle({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <header className="mb-9">
      <h1 className="font-display text-3xl tracking-[-0.01em] sm:text-4xl">{children}</h1>
      {sub ? <p className="mt-2.5 max-w-prose text-ink-soft">{sub}</p> : null}
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
