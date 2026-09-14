import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "master";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "settings",
        label: "Site Settings",
        path: "content/settings",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        fields: [
          { type: "string", name: "email", label: "Contact Email" },
          {
            type: "string",
            name: "phones",
            label: "Phone Numbers",
            list: true,
          },
          { type: "string", name: "whatsapp", label: "WhatsApp Number (digits only, with country code)" },
        ],
      },
    ],
  },
});
