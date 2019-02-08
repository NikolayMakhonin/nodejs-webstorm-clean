"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseArgs = parseArgs;
exports.clean = clean;
exports.default = void 0;

var _webstormConfig = _interopRequireDefault(require("./helpers/webstorm-config"));

var _yargs = _interopRequireDefault(require("yargs"));

function parseArgs(argv) {
  // see http://yargs.js.org/docs/
  const args = (0, _yargs.default)(argv).usage('$0 [input]', '', o => {
    o.positional('input', {
      type: 'string',
      'default': '.idea',
      describe: '.idea directory'
    });
  }).example('$0', 'Run it from project root for quick clean project settings)').options({
    output: {
      alias: 'o',
      describe: 'Output directory'
    }
  }).help().argv;
  return args;
}

function clean(argv) {
  const args = parseArgs(argv || process.argv);
  return _webstormConfig.default.cleanIdeaDir(args.input, args.output);
}

var _default = {
  clean,
  parseArgs
};
exports.default = _default;