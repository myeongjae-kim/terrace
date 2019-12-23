#!/usr/bin/env bash
npm run clean

npm run lint
if [ $? != 0 ]
  then echo '>> failed to lint <<'
  exit 1
fi

npm run report
if [ $? != 0 ]
  then echo '>> failed to pass tests <<'
  exit 1
fi

npm run compileServer
if [ $? != 0 ]
  then echo '>> failed to compile server <<'
  exit 1
fi

export $(egrep -v '^#' .browser-env | xargs) > /dev/null
next build