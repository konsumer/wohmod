import TOML from 'toml'

export function stringify(o) {
  for (const t of Object.keys(o)) {
    for (const k of Object.keys(o[t])) {
      o[t][k] = o[t][k].replace(/\n/g, '#')
    }
  }
  return TOML.stringify(o)
}

export function parse(str) {
  const o = TOML.parse(str)
  for (const t of Object.keys(o)) {
    for (const k of Object.keys(o[t])) {
      o[t][k] = o[t][k].replace(/#/g, '\n')
    }
  }
  return o
}