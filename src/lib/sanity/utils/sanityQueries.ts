import { sanityClient } from "sanity:client";

export type Post = {
  id: string;
  slug: string;
  body: string;
  data: {
    author: string;
    pubDatetime: string;
    modDatetime: string;
    title: string;
    featured: boolean;
    tags: string[];
    description: string;
  };
};

export type Tag = {
  tag: string;
  slug: string;
};

export const getPosts = async (): Promise<Post[]> => {
  return await sanityClient.fetch(
    `*[_type == "post"] | order(_createdAt desc) {
      "id":_id,
      "slug":slug.current,
      "body":content,
      "data": {
        "author": author->name,
        "pubDatetime":_createdAt,
        "modDatetime":_updatedAt,
        title,
        featured,
        "tags":tags[]->name,
        description
      }
    }`
  );
};

export const getTags = async (): Promise<Tag[]> => {
  return await sanityClient.fetch(
    `*[_type == "postTag"] | order(_createdAt desc) {
      "tag":name,
      "slug":slug.current
    }`
  );
};

export const getPostsByTag = async (slug: string): Promise<Post[]> => {
  return sanityClient.fetch(
    `*[_type == "post" && $slug in tags[]->slug.current] | order(_createdAt desc) {
      "id":_id,
      "slug":slug.current,
      "body":content,
      "data": {
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
  );
};
