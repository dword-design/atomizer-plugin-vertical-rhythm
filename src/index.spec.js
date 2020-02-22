import withLocalTmpDir from 'with-local-tmp-dir'
import { endent, property } from '@dword-design/functions'
import { outputFile } from 'fs-extra'
import { Nuxt, Builder } from 'nuxt'
import atomizerModule from '@dword-design/nuxt-atomizer'
import axios from 'axios'
import verticalRhythmPlugin from '@dword-design/atomizer-plugin-vertical-rhythm'

export default {
  'modular scale': () => withLocalTmpDir(async () => {
    await outputFile('pages/index.js', endent`
      export default {
        render: () => <div class="P(2vr) Fz(1ms)">Hello world</div>,
      }
    `)
    const nuxt = new Nuxt({
      modules: [atomizerModule],
      atomizer: {
        plugins: [verticalRhythmPlugin({ modularScale: 'minor second' })],
      },
      dev: false,
    })
    await new Builder(nuxt).build()
    try {
      await nuxt.server.listen()
      expect(axios.get('http://localhost:3000/acss.css') |> await |> property('data'))
        .toEqual('.Fz\\(1ms\\){font-size:1.0666666666666667rem}.P\\(2vr\\){padding:1.5rem}')
    } finally {
      nuxt.close()
    }
  }),
  rhythm: () => withLocalTmpDir(async () => {
    await outputFile('pages/index.js', endent`
      export default {
        render: () => <div class="R(0ms,2vr)">Hello world</div>,
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
        .toEqual('.R\\(0ms\\,2vr\\){font-size:1rem;line-height:1.5rem;padding-top:.41rem;margin-bottom:-.41rem}')
    } finally {
      nuxt.close()
    }
  }),
  units: () => withLocalTmpDir(__dirname, async () => {
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
  }),
}
