#!/usr/bin/env node
'use strict';

const typewriter = require('node-typewriter');

let buffer = [];

process.stdin.setEncoding('utf8');

process.stdin.on('error', () => {
  process.exit(1);
});

process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    buffer.push(chunk);
  }
});

process.stdin.on('end', () => {
  buffer = buffer.join('');
  typewriter(buffer, buffer.length, false);
});
