import { endent, property } from '@dword-design/functions'
import axios from 'axios'
import packageName from 'depcheck-package-name'
import { outputFile } from 'fs-extra'
import { Builder, Nuxt } from 'nuxt'
import withLocalTmpDir from 'with-local-tmp-dir'

import self from '.'

export default {
  'modular scale': () =>
    withLocalTmpDir(async () => {
      await outputFile(
        'pages/index.js',
        endent`
      export default {
        render: () => <div class="P(2vr) Fz(1ms)">Hello world</div>,
      }
    `
      )

      const nuxt = new Nuxt({
        atomizer: {
          plugins: [self({ modularScale: 'minor second' })],
        },
        dev: false,
        modules: [packageName`nuxt-atomizer`],
      })
      await new Builder(nuxt).build()
      try {
        await nuxt.server.listen()
        expect(
          axios.get('http://localhost:3000/acss.css')
            |> await
            |> property('data')
        ).toEqual(
          '.Fz\\(1ms\\){font-size:1.0666666666666667rem}.P\\(2vr\\){padding:1.5rem}'
        )
      } finally {
        nuxt.close()
      }
    }),
  rhythm: () =>
    withLocalTmpDir(async () => {
      await outputFile(
        'pages/index.js',
        endent`
      export default {
        render: () => <div class="R(0ms,2vr)">Hello world</div>,
      }
    `
      )

      const nuxt = new Nuxt({
        atomizer: {
          plugins: [self()],
        },
        dev: false,
        modules: [packageName`nuxt-atomizer`],
      })
      await new Builder(nuxt).build()
      try {
        await nuxt.server.listen()
        expect(
          axios.get('http://localhost:3000/acss.css')
            |> await
            |> property('data')
        ).toEqual(
          '.R\\(0ms\\,2vr\\){font-size:1rem;line-height:1.5rem;margin-bottom:-0.41rem;padding-top:0.41rem}'
        )
      } finally {
        nuxt.close()
      }
    }),
  units: () =>
    withLocalTmpDir(async () => {
      await outputFile(
        'pages/index.js',
        endent`
      export default {
        render: () => <div class="P(2vr) Fz(1ms)">Hello world</div>,
      }
    `
      )

      const nuxt = new Nuxt({
        atomizer: {
          plugins: [self()],
        },
        dev: false,
        modules: [packageName`nuxt-atomizer`],
      })
      await new Builder(nuxt).build()
      try {
        await nuxt.server.listen()
        expect(
          axios.get('http://localhost:3000/acss.css')
            |> await
            |> property('data')
        ).toEqual(
          '.Fz\\(1ms\\){font-size:1.61803398875rem}.P\\(2vr\\){padding:1.5rem}'
        )
      } finally {
        nuxt.close()
      }
    }),
}
