import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Route changes should start at the top, not wherever the last page was left. */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
