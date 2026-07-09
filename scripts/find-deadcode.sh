#!/usr/bin/env bash

exit;

echo;
if ! npx ts-prune | (! grep -vE '(used in module|lint-staged.config.mjs|next.config.ts|tailwind.config.ts|.next/*)')
then
  echo "** 위 메시지를 참고해 사용하지 않는 코드를 제거해주세요. **"
  exit 1
fi
