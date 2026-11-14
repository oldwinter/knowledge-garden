import type { E2EConfig } from 'e2e';
import { web } from '@e2e-dev/web';

const app = {
  url: 'http://127.0.0.1:4173',
  command: {
    executable: 'npm',
    args: ['run', 'dev'],
    reuseExisting: true,
  },
};

export default {
  tests: ['smoke.e2e.ts'],
  targets: [{ name: 'chromium', engine: web(), app }],
} satisfies E2EConfig;
