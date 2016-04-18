// __tests__/test2.js
'use strict';

jest.unmock('a');
jest.mock('b');

const a = require('a');
const b = require('b');

describe('test2.js', function() {
  it('should not mock a', function() {
    expect('_isMockFunction' in a).toBe(false);
  });
});
