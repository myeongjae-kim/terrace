#!/usr/bin/env sh
docker-compose up -d && docker exec -it terrace_mariadb /bin/bash
