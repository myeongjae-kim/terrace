#!/usr/bin/env bash

set -euo pipefail

failed=0

check_forbidden() {
	local description="$1"
	local paths="$2"
	local pattern="$3"

	if rg -n --glob '*.ts' --glob '*.tsx' "$pattern" $paths; then
		printf 'Architecture violation: %s\n' "$description" >&2
		failed=1
	fi
}

check_forbidden \
	'core must not depend on infrastructure, DB, web frameworks, or external adapters' \
	'src/core' \
	"from [\"'](#/(infrastructure|db|features|routes|components)|(@tanstack|react|drizzle-orm|google-auth-library|jose))"

check_forbidden \
	'web code must call in-ports through server functions/getUseCase' \
	'src/routes src/features src/components' \
	"from [\"']#/(db|core/.*/application/port/out|infrastructure/.*/adapter|infrastructure/config/applicationContext\\.server)"

check_forbidden \
	'client-facing routes and components must not import server-only modules' \
	'src/routes src/components' \
	"from [\"'][^\"']*\\.server[\"']"

if (( failed != 0 )); then
	exit 1
fi

printf 'Architecture checks passed.\n'
