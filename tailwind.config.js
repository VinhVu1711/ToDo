/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.js", // Thêm các tệp bạn muốn sử dụng Tailwind
    "./screens/**/*.js",
    "./components/**/*.js",
    "./node_modules/nativewind/**/*.js", // Đảm bảo NativeWind được tìm thấy
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
