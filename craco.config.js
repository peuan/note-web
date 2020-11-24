const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#1DA57A",
              "@error-color": "#a8323c",
              "@layout-header-background": "white",
              "@layout-sider-background": "white",
              "@layout-trigger-background": "#f5f5f5",
              "@layout-trigger-color": "black",
            },

            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
