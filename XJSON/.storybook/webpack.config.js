const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|xjson)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
        include: path.resolve(__dirname, "../")
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"],
        include: path.resolve(__dirname, "../")
      }
    ]
  }
};
