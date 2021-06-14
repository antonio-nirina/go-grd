#!/bin/bash

dir="${HOME}/Documents/faceit/new-project/grind/front-office/client"
server="${HOME}/Documents/faceit/new-project/grind/front-office/api"
orginame="${HOME}/Documents/faceit/new-project/go-example/client"
ws="${HOME}/Documents/faceit/new-project/grind/front-office/ws"
org_server="${HOME}/Documents/faceit/new-project/go-example/api"
ws_server="${HOME}/Documents/faceit/new-project/go-example/ws"

if [ -d ${dir} ] ; then
    rm -rf $dir 
    cp -r ${orginame} "${HOME}/Documents/faceit/new-project/grind/front-office/"
else 
    cp -r ${orginame} "${HOME}/Documents/faceit/new-project/grind/front-office/"
fi

if [  -d ${server} ] ; then
    rm -rf $server
    cp -r ${org_server} "${HOME}/Documents/faceit/new-project/grind/front-office/"
else 
    cp -r ${org_server} "${HOME}/Documents/faceit/new-project/grind/front-office/"
fi

if [  -d ${ws} ] ; then
    rm -rf $ws
    cp -r ${ws_server} "${HOME}/Documents/faceit/new-project/grind/front-office/"
else 
    cp -r ${ws_server} "${HOME}/Documents/faceit/new-project/grind/front-office/"
fi

 echo "server and client copy with success"
