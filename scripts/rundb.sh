#!/usr/bin/env bash
docker-compose up -d && docker exec -it terrace_mariadb /bin/bash
