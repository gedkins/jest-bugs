#!/bin/bash
npm install
cp -r my_node_modules/* node_modules
echo "****** IT SHOULD RUN test1.js before test2.js (and then run test2.js again). If it doesn't do that, the test is inconclusive"
./node_modules/.bin/jest -w 1
./node_modules/.bin/jest -w 1 __tests__/test2.js
