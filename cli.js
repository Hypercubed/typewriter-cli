#!/usr/bin/env node
'use strict';

const getStdin = require('get-stdin');
const typewriter = require('node-typewriter');
const meow = require('meow');

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
const run = str => typewriter(str, str.length / Number(cli.flags.speed) * 1000, false);

if (!input && process.stdin.isTTY) {
  console.error('Input required');
  process.exit(1);
}

if (input) {
  run(input);
} else {
  getStdin().then(run);
}
