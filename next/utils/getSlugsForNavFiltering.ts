/** Generates a list of slugs for filtering the navbar in this shape:
 *  [] or ['/simple-slug'] or ['/slug-part-1', '/slug-part-1/slug-part-2'] etc.
 */
export const getSlugsForNavFiltering = (wholeSlug: string | null | undefined) => {
  if (!wholeSlug) {
    return []
  }

  let split = wholeSlug.split('/')

  // This happens when slug starts with '/'
  if (split[0] === '') {
    split = split.slice(1)
  }
  // We need starting slashes for navigation filtering
  split = split.map((slug) => `/${slug}`)

  const slugs: string[] = []
  split.forEach((slugPart, index) =>
    // eslint-disable-next-line unicorn/prefer-at
    index === 0 ? slugs.push(slugPart) : slugs.push(`${slugs[slugs.length - 1]}${slugPart}`),
  )
  return slugs
}
