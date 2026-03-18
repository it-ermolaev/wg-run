export default {
  '**/package.json': ['npx -y sort-package-json'],
  '**/*!(package-lock*).{js,json}': ['prettier --write'],
}
