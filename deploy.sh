#!/usr/local/bin/fish

rsync --info=progress2 -a * .htaccess nfsn:/home/public
