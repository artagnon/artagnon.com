SHELL=/usr/local/bin/fish

all:
	@clayoven

aggressive:
	@clayoven aggressive

deploy:
	@git push
	@rsync -P -az --delete * .htaccess nfsn:/home/public
