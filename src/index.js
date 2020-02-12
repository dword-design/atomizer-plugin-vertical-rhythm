import postcssCustomUnit from 'postcss-custom-unit'
import postcssFunctions from 'postcss-functions'
import modularscale from 'modularscale'

export default ({ verticalRhythm = 12, fontSize = 16, capHeight = .68, modularScale } = {}) => {

  const shift = (fontSize, lineHeight) =>
    `${(parseFloat(lineHeight) - parseFloat(fontSize) * capHeight) / 2}rem`

  return {
    postcssPlugins: [
      postcssCustomUnit({
        units: [
          {
            from: 'ms',
            convert: value => `${modularscale(value, modularScale)}rem`,
          },
          {
            from: 'vr',
            convert: value => `${value * verticalRhythm / fontSize}rem`,
          },
        ],
      }),
      postcssFunctions({
        functions: {
          shift,
          negativeShift: (fontSize, lineHeight) =>
            `-${shift(fontSize, lineHeight)}`,
        },
      }),
    ],
    rules: [
      {
        type: 'helper',
        name: 'R',
        matcher: 'R',
        styles: {
          'font-size': '$0',
          'line-height': '$1',
          'padding-top': 'shift($0, $1)',
          'margin-bottom': 'negativeShift($0, $1)',
        },
      },
    ],
  }
}
