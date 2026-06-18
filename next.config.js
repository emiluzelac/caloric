/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    // Bootstrap 5.3's own SCSS still relies on @import and the legacy color
    // functions, which Dart Sass now flags as deprecated. These are upstream
    // (node_modules/bootstrap) and not fixable in our code until Bootstrap 6,
    // so silence that dependency noise without hiding warnings in our own SCSS.
    quietDeps: true,
    silenceDeprecations: ['import', 'color-functions', 'global-builtin'],
  },
}

module.exports = nextConfig
