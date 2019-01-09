#!/usr/bin/env bash

npm install
rm -rf /pah-fm/frontend/dist/* || true
npm run watch
