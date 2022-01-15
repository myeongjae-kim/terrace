const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: "ko",
    locales: ["ko", "en"],
    localePath: path.resolve("./public/static/locales"),
  },
};
