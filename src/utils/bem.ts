export type Mod = string | { [key: string]: any }
export type Mods = Mod | Mod[]

function genBem(name: string, mods?: Mods): string {
  if (!mods) {
    return ''
  }

  if (typeof mods === 'string') {
    return ` ${name}--${mods}`
  }

  if (Array.isArray(mods)) {
    return mods.reduce<string>((ret, item) => ret + genBem(name, item), '')
  }

  return Object.keys(mods).reduce((ret, key) => ret + (mods[key] ? genBem(name, key) : ''), '')
}

/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */
export function createBEM(name: string) {
  return (el?: Mods, mods?: Mods): Mods => {
    let _el = el
    let _mods = mods
    if (el && typeof el !== 'string') {
      _mods = el
      _el = ''
    }

    _el = _el ? `${name}__${_el}` : name

    return `${_el}${genBem(_el, _mods)}`
  }
}
export type BEM = ReturnType<typeof createBEM>

export function createNamespace(name: string) {
  // 再考虑一下需不需要这个prefix
  const prefixedName = `${name}`
  return [prefixedName, createBEM(prefixedName)] as const
}
