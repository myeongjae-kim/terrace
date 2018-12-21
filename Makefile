run:
	make build
	./scripts/local-run.sh

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
	echo "Copying 'website'"
	sudo rm -rf /home/web/terrace_deploy/website/
	sudo cp -r ./website /home/web/terrace_deploy/website/
	echo "Copying 'scripts'"
	sudo rm -rf /home/web/terrace_deploy/scripts/
	sudo cp -r ./scripts /home/web/terrace_deploy/scripts/
	echo "Set capability of using low number ports to the server"
	sudo setcap CAP_NET_BIND_SERVICE=+eip /home/web/terrace_deploy/bin/webserver
	echo "Change permissions"
	sudo chown -R web /home/web/terrace_deploy
	sudo chgrp -R web /home/web/terrace_deploy

deploy:
	echo "Deploying to EC2"
	git push production master
	#@echo "Deploying to S3 and invalidate cached files on Cloudfront"
	#@./deploy_to_s3.sh

