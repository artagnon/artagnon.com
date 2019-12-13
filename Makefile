all:
	@clayoven

aggressive:
	@clayoven aggressive

deploy:
	@git push
	@rsync --info=progress2 -a --delete * .htaccess nfsn:/home/public
