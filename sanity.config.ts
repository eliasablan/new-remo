import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { iconPicker } from "sanity-plugin-icon-picker";
import { schemaTypes } from "./src/lib/sanity/schemas";

const projectId = import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_STUDIO_DATASET;

const config = defineConfig({
  name: "default",
  title: "Proyecto Remo | Admin",

  projectId,
  dataset,

  apiVersion: "2024-01-01",

  plugins: [structureTool(), visionTool(), iconPicker()],

  basePath: "/admin",

  schema: {
    types: schemaTypes,
  },
});

export default config;
