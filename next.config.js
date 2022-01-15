const path = require('path');

module.exports = {
  webpack(config, options) {
    config.resolve.modules.push(path.resolve("./"));
    return config;
  }
};
