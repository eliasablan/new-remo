import { defineField, defineType } from "sanity";

export default defineType({
  name: "postTag",
  title: "Post Tag",
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
  ],
});
