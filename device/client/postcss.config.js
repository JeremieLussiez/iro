/* eslint import/no-extraneous-dependencies: 0 */

const postcssSmartImport = require('postcss-smart-import')({/* ...options */});
const precss = require('precss')({/* ...options */});
const autoprefixer = require('autoprefixer')({/* ...options */});

module.exports = {
  plugins: [
    postcssSmartImport,
    precss,
    autoprefixer,
  ],
};

