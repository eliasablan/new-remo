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
  const posts = await sanityClient.fetch(
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
  return posts;
};

export const getTags = async (): Promise<Tag[]> => {
  const tags = await sanityClient.fetch(
    `*[_type == "postTag"] | order(_createdAt desc) {
      "tag":name,
      "slug":slug.current
    }`
  );
  return tags;
};
