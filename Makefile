SHELL=/bin/zsh

all:
	@clayoven

aggressive:
	@clayoven aggressive

deploy:
	@git push
	@rsync -P -az --delete * .htaccess nfsn:/home/public
