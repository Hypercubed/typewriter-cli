#!/usr/bin/env node
'use strict';

const getStdin = require('get-stdin');
const meow = require('meow');

const type = require('./index');

const cli = meow(`
    Usage
      $ typewriter <string>
      $ echo <string> | typewriter

    Options
      --speed, -s  Mean typing animation speed (char/s, default = 1000)

    Examples
      $ ls -l | typewriter
      $ credits -r credits --color | typewriter -s 500
`, {
  alias: {s: 'speed'},
  default: {speed: 1000}
});

const input = cli.input[0];

if (!input && process.stdin.isTTY) {
  console.error('Input required');
  process.exit(1);
}

const avg = 1 / Number(cli.flags.speed) * 1000;
const min = avg / 2;
const max = 3 * min;

const write = process.stdout.write.bind(process.stdout);
const run = str => type(str, {min, max}, write);

if (input) {
  run(input);
} else {
  getStdin().then(run);
}
