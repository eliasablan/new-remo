import { defineField, defineType, defineArrayMember } from "sanity";
import {
  OGMediaEditor,
  OGMediaIcon,
} from "../../../components/sanity/OGMediaEditor";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "post",
  title: "Posts",
  type: "document",
  icon: DocumentIcon,
  fieldsets: [
    {
      title: "SEO & metadata",
      name: "metadata",
      description: "Set up your metadata for SEO here.",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  groups: [
    {
      title: "Content",
      name: "content",
      default: true,
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description:
        "Used both for the <meta> title tag for SEO, and project title.",
      type: "string",
      validation: Rule => [Rule.required().min(10).max(60)],
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: Rule => Rule.required(),
      options: {
        source: "title",
        maxLength: 50,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      description:
        "Used both for the <meta> description tag for SEO, and project subheader.",
      type: "text",
      validation: Rule => [Rule.required().min(50).max(155)],
      group: "content",
    }),
    defineField({
      name: "seo_title",
      title: "SEO Title",
      type: "string",
      description:
        "Used only for the <meta> title tag for SEO, and only if specified.",
      validation: Rule => Rule.min(10).max(60),
      fieldset: "metadata",
    }),
    defineField({
      name: "seo_description",
      title: "SEO Description",
      description:
        "Used only for the <meta> title tag for SEO, and only if specified.",
      type: "string",
      validation: Rule => Rule.min(50).max(155),
      fieldset: "metadata",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: {
        sources: [
          {
            name: "sharing-image",
            title: "Generate Image",
            icon: OGMediaIcon,
            component: OGMediaEditor,
          },
        ],
      },
      fieldset: "metadata",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      validation: Rule => Rule.required(),
      to: [{ type: "author" }],
      group: "content",
    }),
    defineField({
      name: "pubDatetime",
      title: "Publication Date",
      validation: Rule => Rule.required(),
      type: "date",
    }),
    defineField({
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      initialValue: false,
      validation: Rule => Rule.required(),
      options: {
        layout: "switch",
      },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "postTag" }] })],
    }),
    defineField({
      name: "content",
      type: "array",
      title: "Content",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
          ],
        }),
      ],
      group: "content",
    }),
  ],
});
