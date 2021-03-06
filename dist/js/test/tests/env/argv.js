"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _yargs = _interopRequireDefault(require("yargs"));

/* eslint-disable global-require */
describe('argv parser', function () {
  it('base', function () {
    // see http://yargs.js.org/docs/
    const args = _yargs.default.array('x').parse('node example.js -x 1 .2 -x 3 4'.split(' '));

    assert.ok(args);
    assert.ok(args.x);
    assert.deepStrictEqual(args.x, [1, 0.2, 3, 4]); // console.log(JSON.stringify(args, null, 4))
  });
});