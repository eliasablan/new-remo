import { sanityClient } from 'sanity:client'

export type Post = {
  id: string
  slug: string
  body: string
  data: {
    slug: string
    author: string
    pubDatetime: string
    modDatetime: string
    title: string
    featured: boolean
    tags: Tag[]
    description: string
  }
}

export type Tag = {
  name: string
  slug: string
}

export const getPosts = async (): Promise<Post[]> => {
  return await sanityClient.fetch(
    `*[_type == "post"] | order(_createdAt desc) {
      "id":_id,
      "slug":slug.current,
      "body":content,
      "data": {
        "slug":slug.current,
        "author": author->name,
        "pubDatetime":_createdAt,
        "modDatetime":_updatedAt,
        title,
        featured,
        "tags":tags[]->{name,"slug":slug.current},
        description
      }
    }`
  )
}

export const getRecentPosts = async (): Promise<Post[]> => {
  return await sanityClient.fetch(
    `*[_type == "post"][0..2] | order(_createdAt desc) {
      "id":_id,
      "slug":slug.current,
      "body":content,
      "data": {
        "slug":slug.current,
        "author": author->name,
        "pubDatetime":_createdAt,
        title,
        featured,
        "tags":tags[]->{name,"slug":slug.current},
        description
      }
    }`
  )
}

export const getTags = async (): Promise<Tag[]> => {
  return await sanityClient.fetch(
    `*[_type == "postTag"] | order(_createdAt desc) {
      name,
      "slug":slug.current
    }`
  )
}

export const getHome = async (): Promise<any> => {
  return await sanityClient.fetch(
    `*[_type == "home"][0] {
      overview
    }`
  )
}

export const getAbout = async (): Promise<any> => {
  return await sanityClient.fetch(
    `*[_type == "about"][0] {
      overview
    }`
  )
}

export const getSettings = async (): Promise<any> => {
  return await sanityClient.fetch(
    `*[_type == "settings"][0] {
      urls,
      footer
    }`
  )
}

export const getPostsByTag = async (slug: string): Promise<Post[]> => {
  return sanityClient.fetch(
    `*[_type == "post" && $slug in tags[]->slug.current] | order(_createdAt desc) {
      "id":_id,
      "slug":slug.current,
      "body":content,
      "data": {
        "slug":slug.current,
        "author": author->name,
        "pubDatetime":_createdAt,
        "modDatetime":_updatedAt,
        title,
        featured,
        "tags":tags[]->name,
        description
      }
    }`,
    { slug }
  )
}
