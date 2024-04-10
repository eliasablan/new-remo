import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";

export default defineType({
  name: "rrss",
  title: "Social Links",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "url",
      type: "url",
      title: "URL",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "iconPicker",
      validation: Rule => Rule.required(),
      options: {
        providers: ["fa", "mdi", "hi", "fi", "si"],
        outputFormat: "react",
      },
    }),
  ],
});
