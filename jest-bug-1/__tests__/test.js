// __tests__/test.js
'use strict';

jest.mock('a');
jest.unmock('b');

const a = require('a');
const b = require('b');

describe('Jest bug report 1', function() {
  it('should not mock b helper', function() {
    expect('_isMockFunction' in b).toBe(false);
  });
});
