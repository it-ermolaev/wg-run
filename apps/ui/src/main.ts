import { mount } from 'svelte'

import App from '@app/app.svelte'

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
