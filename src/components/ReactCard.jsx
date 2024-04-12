import React from 'react'
import Datetime from './Datetime.astro'

export default function Card({ href, frontmatter, secHeading = true }) {
  const { title, slug, pubDatetime, modDatetime, description } = frontmatter

  const headerProps = {
    style: { viewTransitionName: slug },
    className: 'text-lg font-medium decoration-dashed hover:underline'
  }

  return (
    <>
      <li className='my-6'>
        <a
          href={href}
          className='inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0'
        >
          {secHeading ? (
            <h2 {...headerProps}>{title}</h2>
          ) : (
            <h3 {...headerProps}>{title}</h3>
          )}
        </a>
        <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
        <p>{description}</p>
      </li>
    </>
  )
}
