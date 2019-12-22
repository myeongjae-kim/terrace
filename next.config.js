const path = require('path')

module.exports = {
  webpack(config, options) {
    config.resolve.modules.push(path.resolve('./'))
    return config
  },
  env: {
    CONTENT_API: process.env.CONTENT_API,
    MOTHER_API: process.env.MOTHER_API,
  },
  useFileSystemPublicRoutes: false,
};
