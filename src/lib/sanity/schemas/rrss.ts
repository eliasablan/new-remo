import { defineField, defineType } from "sanity";

export default defineType({
  name: "rrss",
  title: "Social Links",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "url",
      type: "url",
      title: "URL",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "iconPicker",
      options: {
        providers: ["fa", "mdi", "hi", "fi", "si"],
        outputFormat: "react",
      },
    }),
  ],
});
