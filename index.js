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
  let min = isNaN(opt.min) ? 40 : opt.min;
  let max = isNaN(opt.max) ? 80 : opt.max;
  let size = 1;

  if (min < 10) {
    const S = 10 / min;
    min = 10;
    max *= S;
    size = Math.floor(S * size);
  }

  const delay = delayer(min, max);
  const len = string.length;

  type(0);

  function type(pos) {
    onchange(sliceAnsi(string, pos, pos + size));

    if (pos <= len) {
      t = setTimeout(type, delay(), pos + size);
    }
  }

  return function () {
    clearTimeout(t);
    onchange(typed, true);
  };
};
