const delayer = require('string-typer/delay');
const sliceAnsi = require('slice-ansi');

module.exports = function (string, opt, onchange) {
  if (typeof opt === 'function') {
    onchange = opt;
    opt = {};
  }

  let t = null;
  let typed = '';

  // Set keystroke delay range
  opt.min = isNaN(opt.min) ? 40 : opt.min;
  opt.max = isNaN(opt.max) ? 80 : opt.max;

  const delay = delayer(opt.min, opt.max);
  const len = string.length;

  type(0);

  function type(pos) {
    onchange(sliceAnsi(string, pos, ++pos));

    if (pos <= len) {
      t = setTimeout(type, delay(), pos);
    }
  }

  return function () {
    clearTimeout(t);
    onchange(typed, true);
  };
};
