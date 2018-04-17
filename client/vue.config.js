const StringReplacePlugin = require('string-replace-webpack-plugin');

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: StringReplacePlugin.replace({
            replacements: [
              {
                pattern: /__([a-zA-Z0-9.]*?)__/ig,
                replacement(match, token) {
                  // console.log(token);
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

