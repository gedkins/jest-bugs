#!/bin/bash
npm install
cp -r my_node_modules/* node_modules
npm test
