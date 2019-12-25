#!/usr/bin/env bash
tsc *.ts
npx typeorm migration:run