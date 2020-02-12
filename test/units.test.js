import withLocalTmpDir from 'with-local-tmp-dir'
import { endent, property } from '@dword-design/functions'
import { outputFile } from 'fs-extra'
import { Nuxt, Builder } from 'nuxt'
import atomizerModule from '@dword-design/nuxt-atomizer'
import axios from 'axios'
import verticalRhythmPlugin from '@dword-design/atomizer-plugin-vertical-rhythm'

export default () => withLocalTmpDir(__dirname, async () => {
  await outputFile('pages/index.js', endent`
    export default {
      render: () => <div class="P(2vr) Fz(1ms)">Hello world</div>,
    }
  `)
  const nuxt = new Nuxt({
    modules: [atomizerModule],
    atomizer: {
      plugins: [verticalRhythmPlugin()],
    },
    dev: false,
  })
  await new Builder(nuxt).build()
  try {
    await nuxt.server.listen()
    expect(axios.get('http://localhost:3000/acss.css') |> await |> property('data'))
      .toEqual('.Fz\\(1ms\\){font-size:1.61803398875rem}.P\\(2vr\\){padding:1.5rem}')
  } finally {
    nuxt.close()
  }
})
