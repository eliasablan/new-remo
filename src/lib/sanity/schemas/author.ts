import { preview } from "sanity-plugin-icon-picker";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
    }),
    defineField({
      name: "image",
      title: "Author's Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "socials",
      type: "array",
      title: "Social Links",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "rrss",
              title: "RRSS",
              type: "reference",
              to: [{ type: "rrss" }],
            }),
            defineField({
              name: "username",
              title: "Username",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "rrss.name",
              url: "rrss.url",
              username: "username",
              icon: "rrss.icon",
            },
            prepare(selection) {
              const { title, url, username, icon } = selection;
              return {
                title,
                subtitle: new URL(username, url).href,
                media: preview(icon),
              };
            },
          },
        },
      ],
    }),
  ],
});
