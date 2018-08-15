local:
	@echo "Local Deploy"
	#@rm -rf /home/git/terrace_deploy/*
	#@cp -r * /home/git/terrace_deploy
	@go build -x -o /home/git/terrace_deploy/bin/terrace
	@sudo systemctl restart "terrace.service" && sudo systemctl status "terrace.service"

update:
	@echo "Makefile: Doing UPDATE stuff like grunt, gulp, rake,..."
	@whoami
	@pwd
	@/usr/local/go/bin/go build -x -o bin/terrace

deploy:
	@echo "Pushing to production"
	@git push git@8.9.37.186:~/terrace_hook master

push:
	@echo "Pushing to github, local and production"
	@git push
	@make local
	@make deploy
