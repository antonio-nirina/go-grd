#!/bin/bash

dir="${HOME}/Documents/faceit/new-project/grind/client"
server="${HOME}/Documents/faceit/new-project/grind/api"
orginame="${HOME}/Documents/faceit/new-project/go-example/client"
ws="${HOME}/Documents/faceit/new-project/grind/ws"
org_server="${HOME}/Documents/faceit/new-project/go-example/api"
ws_server="${HOME}/Documents/faceit/new-project/go-example/ws"
gitlab="${HOME}/Documents/faceit/new-project/go-example/gitlab-ci.txt"

if [ -d ${dir} ] ; then
    rm -rf $dir 
    cp -r ${orginame} "${HOME}/Documents/faceit/new-project/grind/"
else 
    cp -r ${orginame} "${HOME}/Documents/faceit/new-project/grind/"
fi

if [  -d ${server} ] ; then
    rm -rf $server
    cp -r ${org_server} "${HOME}/Documents/faceit/new-project/grind/"
else 
    cp -r ${org_server} "${HOME}/Documents/faceit/new-project/grind/"
fi

if [  -d ${ws} ] ; then
    rm -rf $ws
    cp -r ${ws_server} "${HOME}/Documents/faceit/new-project/grind/"
else 
    cp -r ${ws_server} "${HOME}/Documents/faceit/new-project/grind/"
fi

if [ -f ${gitlab} ] ; then
    rm -rf $gitlab
    cp -r ${gitlab} "${HOME}/Documents/faceit/new-project/grind/"
else 
    cp -r ${gitlab} "${HOME}/Documents/faceit/new-project/grind/"
fi

 echo "server and client copy with success"
