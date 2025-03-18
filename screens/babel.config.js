const plugin = require("tailwindcss");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-present-expo"],
    plugins: ["nativewind/babel"],
  };
};
