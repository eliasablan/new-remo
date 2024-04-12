import { SITE } from '../config'
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from 'sanity:client'
import type { Post } from './sanity/utils/sanityQueries'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const imageSanityBuilder = imageUrlBuilder(sanityClient)

export const urlFor = (source: SanityImageSource) =>
  imageSanityBuilder.image(source)

interface GetPaginationProps<T> {
  posts: T
  page: string | number
  isIndex?: boolean
}

export const getPagination = <T>({
  posts,
  page,
  isIndex = false
}: GetPaginationProps<T[]>) => {
  const totalPagesArray = getPageNumbers(posts.length)
  const totalPages = totalPagesArray.length

  const currentPage = isIndex
    ? 1
    : page && !isNaN(Number(page)) && totalPagesArray.includes(Number(page))
      ? Number(page)
      : 0

  const lastPost = isIndex ? SITE.postPerPage : currentPage * SITE.postPerPage
  const startPost = isIndex ? 0 : lastPost - SITE.postPerPage
  const paginatedPosts = posts.slice(startPost, lastPost)

  return {
    totalPages,
    currentPage,
    paginatedPosts
  }
}

export const getPageNumbers = (numberOfPosts: number) => {
  const numberOfPages = numberOfPosts / Number(SITE.postPerPage)

  let pageNumbers: number[] = []
  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers = [...pageNumbers, i]
  }

  return pageNumbers
}

export const postFilter = ({ data }: Post) => {
  const isPublishTimePassed =
    Date.now() > new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin
  return import.meta.env.DEV || isPublishTimePassed
}

export const getSortedPosts = (posts: Post[]) => {
  return posts
    .filter(postFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    )
}
