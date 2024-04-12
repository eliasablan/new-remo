import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { iconPicker } from 'sanity-plugin-icon-picker'
import { schemaTypes } from './src/lib/sanity/schemas'
import {
  pageStructure,
  singletonPlugin
} from './src/lib/sanity/plugins/settings'
import home from './src/lib/sanity/schemas/home'
import settings from './src/lib/sanity/schemas/settings'
import about from './src/lib/sanity/schemas/about'
import ToolMenu from './src/components/sanity/studio/ToolMenu'

const projectId =
  import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID ||
  import.meta.env.PUBLIC_SANITY_PROJECT_ID
const dataset =
  import.meta.env.PUBLIC_SANITY_STUDIO_DATASET ||
  import.meta.env.PUBLIC_SANITY_DATASET

const config = defineConfig({
  name: 'default',
  title: 'Proyecto Remo | Admin',

  projectId,
  dataset,

  apiVersion: '2024-01-01',

  plugins: [
    deskTool({
      // @ts-expect-error
      structure: pageStructure([home, about, settings])
    }),
    visionTool(),
    iconPicker(),
    singletonPlugin([home.name, about.name, settings.name])
  ],
  schema: {
    types: schemaTypes
  },

  studio: {
    components: {
      toolMenu: ToolMenu
    }
  }
})

export default config
