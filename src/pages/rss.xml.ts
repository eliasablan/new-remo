import rss from "@astrojs/rss";
import { getPosts } from "../lib/sanity/utils/sanityQueries";
import { SITE } from "../config";

export async function GET() {
  const posts = await getPosts();
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: posts.map(({ data, slug }) => ({
      link: `posts/${slug}/`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
