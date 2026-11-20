
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,

  forbidOnly: Boolean(process.env.CI),

  retries: 0,

  workers: 1,

  reporter: 'list',

  timeout: 30000,

  expect: {
    timeout: 5000
  }
});
