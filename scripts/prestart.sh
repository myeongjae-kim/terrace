#!/usr/bin/env bash

mj_hostname=$(hostname)
mj_whoami=$(whoami)
mj_text="starting terrace-frontend on $mj_whoami@$mj_hostname"
curl $SLACK_WEBHOOK \
  -X 'POST' \
  -H 'Content-Type: application/json' \
  -d "{\"text\": \"$mj_text\"}"

exit 0
