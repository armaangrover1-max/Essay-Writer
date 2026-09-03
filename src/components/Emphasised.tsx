import { Fragment } from 'react'

/**
 * Source titles are written with *asterisks* around the work. Render those as
 * italics rather than leaking punctuation into the page.
 */
export function Emphasised({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
          <em key={i}>{part.slice(1, -1)}</em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}
