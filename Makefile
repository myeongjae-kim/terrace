local:
	@echo "Local Deploy"
	@go build -x -o /home/git/terrace_deploy/bin/terrace
	@sudo systemctl restart "terrace.service" && sudo systemctl status "terrace.service"

deploy:
	@echo "Pushing to production"
	@git push git@myeongjae.kim:~/terrace_hook master

update:
	@echo "Makefile: Doing UPDATE stuff like grunt, gulp, rake,..."
	@whoami
	@pwd
	@/usr/local/go/bin/go build -x -o bin/terrace
