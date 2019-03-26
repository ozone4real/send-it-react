"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var app = (0, _express.default)();
var port = process.env.PORT || 3000; // __dirname = /
// react  app
// resolve = /dist

app.use(_express.default.static(_path.default.resolve(__dirname, 'dist'))); // handling react router, for request to react app
// join = /dist/index.html

app.get('*', function (req, res) {
  res.sendFile(_path.default.join(__dirname, 'dist/index.html'));
});
app.listen(port, function () {
  return console.log('server running at port', port);
});
var _default = app;
exports.default = _default;