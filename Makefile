run:
	make build
	./bin/webserver -web-root-directory ./web/home/dist

build:
	./scripts/build-webserver.sh

update:
	echo "Remote Deploy"
	sudo systemctl stop "terrace.service"
	echo "The terrace service has been stopped"
	echo "Building the server"
	make build
	echo "Copying built results to 'web' user for security"
	sudo cp ./bin/webserver /home/web/terrace_deploy/bin/webserver
	echo "Copying web_root twice for removing legacy version without error occurred by 'rm'"
	sudo rm -rf /home/web/terrace_deploy/web/home/dist
	sudo cp -r ./web/home/dist /home/web/terrace_deploy/web/home/dist
	sudo chown -R web /home/web/home/dist
	sudo chgrp -R web /home/web/home/dist
	echo "Set capability of using low number ports to the server"
	sudo setcap CAP_NET_BIND_SERVICE=+eip /home/web/terrace_deploy/bin/webserver

deploy:
	echo "Deploying to EC2"
	git push git@52.79.241.46:~/terrace_hook master
	#@echo "Deploying to S3 and invalidate cached files on Cloudfront"
	#@./deploy_to_s3.sh
