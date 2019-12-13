all:
	@clayoven

aggressive:
	@clayoven all

deploy:
	@git push
	@rsync --info=progress2 -a --delete * .htaccess nfsn:/home/public
