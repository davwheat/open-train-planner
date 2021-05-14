export interface StringifyFunctionOptions {
  capitaliseStart: boolean
  addFullStop: boolean
}

export const defaultStringifyOptions: StringifyFunctionOptions = {
  capitaliseStart: true,
  addFullStop: true,
}

export default function applyStringifyOptions(text: string, options: Partial<StringifyFunctionOptions>): string {
  const opts = { ...defaultStringifyOptions, ...options }
  let out = text.trim()

  if (opts.capitaliseStart) {
    out = text.substr(0, 1).toUpperCase() + text.substr(1)
  }

  if (opts.addFullStop && text.substr(-1, 1) !== '.') {
    out += '.'
  } else if (!opts.addFullStop && text.substr(-1, 1) === '.') {
    out = out.substr(0, out.length - 1)
  }

  return out
}
