export default {
  'package.json': ['npx -y sort-package-json'],
  '{src,test}/**/*.ts': [() => 'npm run check-types', 'npm run lint:fix'],
}
