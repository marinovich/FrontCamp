const path = require('path');

module.exports = {
  plugins: [
    require('postcss-import')({
      path: [path.join(__dirname, 'src')]
    }),
    require('postcss-cssnext')({
      features: {
        customProperties: true
      }
    }),
    require('postcss-flexbugs-fixes'),
    require('postcss-nested'),
  ],
};
