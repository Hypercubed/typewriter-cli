#!/usr/bin/env node
'use strict';

const getStdin = require('get-stdin');
const meow = require('meow');

const type = require('./type');

const cli = meow(`
    Usage
      $ typewriter <string>
      $ echo <string> | typewriter

    Options
      --speed, -s  Typing animation speed (char/s, default = 1000)

    Examples
      $ ls -l | typewriter
`, {
  alias: {s: 'speed'},
  default: {speed: 1000}
});

const input = cli.input[0];

if (!input && process.stdin.isTTY) {
  console.error('Input required');
  process.exit(1);
}

const min = 1 / Number(cli.flags.speed) * 1000;
const max = 2 * min;

const write = process.stdout.write.bind(process.stdout);
const run = str => type(str, {min, max}, write);

if (input) {
  run(input);
} else {
  getStdin().then(run);
}
