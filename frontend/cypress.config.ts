import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl:'https://dev.d3vyzw80s24mm5.amplifyapp.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
