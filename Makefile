all:
	@echo "Doing all"

deploy:
	@echo "Pushing to production"
	@git push git@myeongjae.kim:~/terrace_hook master

update:
	@echo "Makefile: Doing UPDATE stuff like grunt, gulp, rake,..."
	@whoami
	@pwd
