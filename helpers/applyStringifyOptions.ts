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
  let out = text

  if (opts.capitaliseStart) {
    out = text.substr(0, 1).toUpperCase() + text.substr(1)
  }

  if (opts.addFullStop) {
    out += '.'
  }

  return out
}
