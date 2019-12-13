#!/usr/local/bin/fish

rsync --info=progress2 -a --delete * .htaccess nfsn:/home/public
