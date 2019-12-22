#!/usr/bin/env bash

# set environment variable from .env
# https://gist.github.com/judy2k/7656bfe3b322d669ef75364a46327836

export $(egrep -v '^#' .node-env | xargs) > /dev/null
NODE_ENV=production node -r tsconfig-paths/register server