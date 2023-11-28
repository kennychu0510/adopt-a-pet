import { createClient } from '@supabase/supabase-js';
import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },

  env: {
    ...process.env,
    rootURL: 'http://localhost:3000'
  },

  e2e: {
    setupNodeEvents(on, config) {
    },
  },
});
