const StringReplacePlugin = require('string-replace-webpack-plugin');

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api/*": {
        target: "http://localhost:3000",
        secure: false
      }
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: StringReplacePlugin.replace({
            replacements: [
              {
                pattern: /([a-zA-Z0-9-]+)="__([a-zA-Z0-9.]+?)__"/ig,
                replacement(match, attribute, token) {
                  return `:${attribute}="$options.filters.translate('${token}')"`;
                },
              },
              {
                pattern: /__([a-zA-Z0-9.]+?)__/ig,
                replacement(match, token) {
                  return `{{'${token}' | translate}}`;
                },
              },
            ],
          }),
        },
      ],
    },
  },
};

