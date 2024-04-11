import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { preview } from "sanity-plugin-icon-picker";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "menu_links",
      title: "Menu Links",
      default: true,
    },
    {
      name: "footer",
      title: "Footer",
    },
  ],
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: "urls",
      type: "array",
      title: "URL Links",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            {
              name: "text",
              type: "string",
              title: "Text",
              validation: Rule => [Rule.required()],
            },
            {
              name: "url",
              type: "string",
              title: "URL",
              validation: Rule => [Rule.required()],
            },
          ],
          preview: {
            select: {
              title: "text",
              subtitle: "url",
            },
            prepare(selection) {
              const { title, subtitle } = selection;
              return {
                title: title,
                subtitle: subtitle,
              };
            },
          },
        }),
      ],
      group: "menu_links",
    }),
    defineField({
      name: "footer",
      description:
        "This is a block of text that will be displayed at the bottom of the page.",
      title: "Footer Info",
      type: "text",
      group: "footer",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Menu Items",
      };
    },
  },
});
