const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A","@error-color":"#a8323c" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
