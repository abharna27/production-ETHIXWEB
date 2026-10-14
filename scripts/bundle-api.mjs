import esbuild from 'esbuild';

const targets = [
  'api/health.js',
  'api/leads.js',
  'api/index.js',
  'api/[...path].js',
  'api/admin/login.js',
];

for (const outfile of targets) {
  await esbuild.build({
    entryPoints: ['src/server/apiEntry.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    packages: 'external',
    outfile,
  });
}

console.log('✓ Vercel serverless API handlers bundled successfully.');
