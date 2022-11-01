// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  /**
   * Every entity has its own rules how its path is generated. Those rules are defined by `getFullPathFn`. In order to
   * verify if the route is valid later on, the full path is passed on as a parameter to the Next route.
   *
   * E.g.
   * Full path: /aktuality/novinky/:slug
   * Redirect:  /articles/aktuality/novinky/:slug
   *            [       ][                      ]
   *             Next.js        :fullPath
   *              route
   */
  generateRedirects: (paths) =>
    paths.map(({ fullPath, nextRoute }) => ({
      source: fullPath,
      destination: `${nextRoute}${fullPath}`,
    })),
}
