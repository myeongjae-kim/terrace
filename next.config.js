const path = require('path')

module.exports = {
  webpack(config, options) {
    config.resolve.modules.push(path.resolve('./'))
    return config
  },
  env: {
    DOMAIN: process.env.DOMAIN,
    DOMAIN_BLOG: process.env.DOMAIN_BLOG,
  },
};
