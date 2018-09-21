mac:
	@go build -x -o ./bin/terrace ./src
	sudo ./bin/terrace

local:
	@echo "Local Deploy"
	@sudo systemctl stop "terrace.service"
	@echo "The terrace service has been stopped"
	@echo "Building the server"
	@go build -x -o /home/git/terrace_deploy/bin/terrace ./src
	@echo "Copying built results to 'web' user for security"
	@sudo cp /home/git/terrace_deploy/bin/terrace /home/web/terrace_deploy/bin/terrace
	@echo "Copying twice for removing legacy version without error occurred by 'rm'"
	@sudo cp -r /home/git/terrace_deploy/web_root /home/web/terrace_deploy/web_root
	@sudo rm -rf /home/web/terrace_deploy/web_root
	@sudo cp -r /home/git/terrace_deploy/web_root /home/web/terrace_deploy/web_root
	@sudo chown -R web /home/web/terrace_deploy
	@sudo chgrp -R web /home/web/terrace_deploy
	@sudo setcap CAP_NET_BIND_SERVICE=+eip /home/web/terrace_deploy/bin/terrace
	@echo "Set capability of using low number ports to the server"
	@sudo systemctl start "terrace.service" && sudo systemctl status "terrace.service"

update:
	@echo "Remote Deploy"
	@sudo systemctl stop "terrace.service"
	@echo "The terrace service has been stopped"
	@echo "Building the server"
	@/usr/local/go/bin/go build -x -o bin/terrace ./src
	@echo "Copying built results to 'web' user for security"
	@sudo cp bin/terrace /home/web/terrace_deploy/bin/terrace
	@echo "Copying web_root twice for removing legacy version without error occurred by 'rm'"
	@sudo cp -r web_root /home/web/terrace_deploy/web_root
	@sudo rm -rf /home/web/terrace_deploy/web_root
	@sudo cp -r web_root /home/web/terrace_deploy/web_root
	@sudo chown -R web /home/web/terrace_deploy
	@sudo chgrp -R web /home/web/terrace_deploy
	@echo "Set capability of using low number ports to the server"
	@sudo setcap CAP_NET_BIND_SERVICE=+eip /home/web/terrace_deploy/bin/terrace

deploy:
	@echo "Deploying to EC2"
	@git push git@52.78.35.166:~/terrace_hook master
	#@echo "Deploying to S3 and invalidate cached files on Cloudfront"
	#@./deploy_to_s3.sh

push:
	@echo "Pushing to github, local and production"
	@git push
	@make local
	@make deploy
