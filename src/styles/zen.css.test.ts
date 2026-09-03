/// <reference types="node" />
import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'

// Read as text rather than imported: Vitest's CSS handling returns an empty
// string for a `?raw` stylesheet import, and import.meta.url is not a file URL
// under the test transform. Vitest runs from the project root.
const css = readFileSync('src/styles/zen.css', 'utf8')

/**
 * The palette lives in CSS, so nothing else can catch a phase that silently
 * lost a colour — or, as happened once, an explicit-dark block that was given
 * the daytime values by a careless find-and-replace.
 */
const PHASES = ['depart', 'climb', 'cruise', 'descend', 'arrive'] as const
const VARS = [
  '--sky-1', '--sky-2', '--sky-3', '--sky-4',
  '--sun', '--sun-glow', '--land-base', '--cloud', '--wing',
  '--city-light', '--star-opacity', '--sun-y',
] as const

type Family = 'day' | 'media-dark' | 'explicit-dark'

function block(family: Family, phase: string): string {
  const selector =
    family === 'day'
      ? `\\.zen\\[data-phase="${phase}"\\]`
      : family === 'media-dark'
        ? `:root:not\\(\\[data-theme="light"\\]\\) \\.zen\\[data-phase="${phase}"\\]`
        : `:root\\[data-theme="dark"\\] \\.zen\\[data-phase="${phase}"\\]`
  const match = css.match(new RegExp(`${selector}\\s*\\{([^}]*)\\}`))
  expect(match, `${family} block for ${phase} is missing`).not.toBeNull()
  return match![1]!
}

function declared(family: Family, phase: string, name: string): string | null {
  const m = block(family, phase).match(new RegExp(`${name}:\\s*([^;]+);`))
  return m ? m[1]!.trim() : null
}

describe('zen palette', () => {
  test('the stylesheet was actually found', () => {
    // Guards against a path change turning every assertion below into a
    // vacuous pass against an empty string.
    expect(css.length).toBeGreaterThan(2000)
  })

  test('every animated variable is registered with @property', () => {
    for (const name of VARS) {
      // Unregistered custom properties cannot transition — the whole palette
      // would hard-cut between phases without these declarations.
      expect(css, `${name} is not registered`).toContain(`@property ${name}`)
    }
  })

  test('every phase defines every variable, in all three theme blocks', () => {
    for (const family of ['day', 'media-dark', 'explicit-dark'] as Family[]) {
      for (const phase of PHASES) {
        for (const name of VARS) {
          expect(declared(family, phase, name), `${family}/${phase}/${name}`).not.toBeNull()
        }
      }
    }
  })

  test('the two dark blocks agree exactly', () => {
    // They must, or the theme toggle and the system preference disagree.
    for (const phase of PHASES) {
      for (const name of VARS) {
        expect(
          declared('explicit-dark', phase, name),
          `${phase} ${name} differs between the media query and the toggle`,
        ).toBe(declared('media-dark', phase, name))
      }
    }
  })

  test('night is not simply a copy of day', () => {
    for (const phase of PHASES) {
      for (const name of ['--sky-1', '--land-base', '--cloud', '--wing']) {
        expect(
          declared('explicit-dark', phase, name),
          `${phase} ${name} is identical in day and night — likely a bad replace`,
        ).not.toBe(declared('day', phase, name))
      }
    }
  })

  test('the wing is a lit surface by day and a silhouette at night', () => {
    const luminance = (hex: string) => {
      const h = hex.replace('#', '')
      return (
        parseInt(h.slice(0, 2), 16) * 0.299 +
        parseInt(h.slice(2, 4), 16) * 0.587 +
        parseInt(h.slice(4, 6), 16) * 0.114
      )
    }
    for (const phase of PHASES) {
      expect(luminance(declared('day', phase, '--wing')!), `${phase} day wing`).toBeGreaterThan(100)
      expect(luminance(declared('explicit-dark', phase, '--wing')!), `${phase} night wing`).toBeLessThan(45)
    }
  })
})
