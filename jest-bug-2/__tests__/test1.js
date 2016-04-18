// __tests__/test1.js
'use strict';

jest.unmock('sleep');
jest.mock('a');
jest.unmock('b');

const sleep = require('sleep');
const a = require('a');
const b = require('b');

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// Jest will run the largest (by file size) and slowest tests first
// So fill this file with comment characters and wait 1 second to
// make sure it gets run first.
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

describe('test1.js', function() {
  it("waits 1 second but doesn't otherwise do anything", function() {
    sleep.sleep(1);
  });
});
