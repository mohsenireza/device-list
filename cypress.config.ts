import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:8080',
        retries: 2,
        video: false,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
