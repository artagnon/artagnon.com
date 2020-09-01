SHELL=/bin/zsh

all:
	@clayoven

aggressive:
	@clayoven aggressive

deploy:
	@git push
	@rsync -a --delete * .htaccess nfsn:/home/public
