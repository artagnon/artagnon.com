#!/usr/local/bin/fish

rsync --info=progress2 -av * .htaccess nfsn:/home/public
