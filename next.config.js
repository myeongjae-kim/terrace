const path = require('path');
const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  webpack(config, options) {
    config.resolve.modules.push(path.resolve("./"));
    return config;
  }
};
