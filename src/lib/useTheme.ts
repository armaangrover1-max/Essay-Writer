import { useEffect } from 'react'
import type { ThemePref } from './types'

/** 'system' leaves the attribute off so prefers-color-scheme decides. */
export function useTheme(theme: ThemePref): void {
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', theme)
  }, [theme])
}
