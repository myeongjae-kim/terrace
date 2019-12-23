#!/usr/bin/env bash
find src -name "*.js" -type f
find server -name "*.js" -type f

find src -name "*.js" -type f -delete
find server -name "*.js" -type f -delete

find src -name "*.js.map" -type f
find server -name "*.js.map" -type f

find src -name "*.js.map" -type f -delete
find server -name "*.js.map" -type f -delete

echo
echo ">> Above files have been deleted. <<"