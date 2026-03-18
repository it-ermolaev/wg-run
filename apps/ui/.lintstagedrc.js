export default {
  'package.json': ['npx -y sort-package-json'],
  'src/**/*.{ts,svelte}': [() => 'npm run check-types', 'npm run lint:fix'],
  'src/**/*.{scss,svelte}': [() => 'npm run stylelint:fix'],
}
