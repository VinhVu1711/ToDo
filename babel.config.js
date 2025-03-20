module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel", // Thêm dòng này để sử dụng NativeWind
    ],
  };
};
