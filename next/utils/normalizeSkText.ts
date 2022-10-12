// https://github.com/LabZoneSK/predlozky/blob/main/src/index.js
const prepositions = ['k', 's', 'v', 'z', 'o', 'u', 'na', 'za', 'do', 'a', 'i']

export const normalizeSkText = (text: string) => {
  let normalized = text
  prepositions.forEach((preposition) => {
    // eslint-disable-next-line security/detect-non-literal-regexp
    const re = new RegExp(` [${preposition}] `, 'gmi')
    normalized = normalized.replace(re, ` ${preposition}${String.fromCodePoint(160)}`)
  })

  return normalized
}
