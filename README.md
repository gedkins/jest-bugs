# jest-bugs
A couple of test cases illustrating bugs in the Jest framework

Both problems are with the shouldMockModuleCache in Runtime.js. To run each test case, run the corresponding run.sh.

These tests use fake libraries copied from a separate directory into node\_modules. Obviously we encountered these bugs in the wild with real libraries, specifically "sntp" and "promise" both including './lib'.

clean.sh simply removes the node\_modules directory and should restore each directory to the checked out state.

jest-bug-1
==========

The setup:
- We have two "libraries" called 'a' and 'b'. Each imports a corresponding "helper".
- Then we run jest
- test.js will mock 'a' and unmock 'b'. It will later use 'b', expecting to see the unmocked version of b's helper.

What happens
- Mocking 'a' will store './helper' in Jest's internal shouldMockModuleCache.
- when we later come to use 'b', Jest will discover that './helper' is already in the shouldMockModuleCache, *even though it was referring to a completely different file*.
- hence we end up with the mock version of b/helper.js

What you will see:
- If you run ./run.sh you will see the test case fail.
- If you comment out the require('a') line in \_\_tests\_\_/test.js, you will see the test case pass.

What I would expect to see in the absense of a bug:
- The original test case passes.

jest-bug-2
==========

The setup:
- We have three libraries, 'a', 'b' and 'c'
- 'a' includes 'c'
- 'b' includes 'c'
- There are two test files: test1.js and test2.js
- test1.js doesn't really do anything, but tells Jest to mock 'a' and not mock 'b'.
- test2.js does it the other way around: it tells Jest to unmock 'a' but mock 'b'.
- First we run test1.js and test2.js in sequence. Then in a separate invocation of jest, we run test2.js on its own.

What happens:
- When we run test1.js, Jest stores 'c' in its shouldMockModuleCache
- It does not clear this cache between test runs
- When we run test2.js, Jest discovers 'c' in its shoulMockModuleCache and assumes that we want it mocked

What you will see:

When you run ./run.sh you will see something like this:

    Using Jest CLI v11.0.0, jasmine2
    PASS  __tests__/test1.js (1.017s)
    FAIL  __tests__/test2.js (0.015s)
    Using Jest CLI v11.0.0, jasmine2
    PASS  __tests__/test2.js (0.016s)

Note that if for some reason Jest decides to run the files in a different order, you will not see the failure. I couldn't see a way to explictly specify an order, so I put in a kludge to make sure it happens in the order that I want.

What I would expect to see in the absense of a bug:
- test2.js will always behave the same way, regardless of what other tests are run beforehand.
