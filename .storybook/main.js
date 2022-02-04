const path = require('path');

module.exports = {
  stories: ['../src/**/*/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    'storybook-addon-jsx',
    '@storybook/preset-create-react-app',
    '@storybook/addon-viewport',
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('react-docgen-typescript-loader'),
          options: {
            tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
          }
        },
      ],
    });
    config.resolve.modules = [
      path.resolve(__dirname, '..', 'src'),
      path.resolve(__dirname, '..', 'node_modules'),
    ];
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
