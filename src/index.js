import modularscale from 'modularscale'
import postcssCustomUnit from 'postcss-custom-unit'
import postcssFunctions from 'postcss-functions'

export default config => {
  config = { capHeight: 0.68, fontSize: 16, verticalRhythm: 12, ...config }
  const shift = (fontSize, lineHeight) =>
    `${
      (parseFloat(lineHeight) - parseFloat(fontSize) * config.capHeight) / 2
    }rem`
  return {
    postcssPlugins: [
      postcssCustomUnit({
        units: [
          {
            convert: value => `${modularscale(value, config.modularScale)}rem`,
            from: 'ms',
          },
          {
            convert: value =>
              `${(value * config.verticalRhythm) / config.fontSize}rem`,
            from: 'vr',
          },
        ],
      }),
      postcssFunctions({
        functions: {
          negativeShift: (fontSize, lineHeight) =>
            `-${shift(fontSize, lineHeight)}`,
          shift,
        },
      }),
    ],
    rules: [
      {
        matcher: 'R',
        name: 'R',
        styles: {
          'font-size': '$0',
          'line-height': '$1',
          'margin-bottom': 'negativeShift($0, $1)',
          'padding-top': 'shift($0, $1)',
        },
        type: 'helper',
      },
    ],
  }
}
