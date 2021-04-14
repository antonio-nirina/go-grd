#!/bin/bash

dir="${HOME}/Documents/faceit/new-project/grind/front-office/client"
orginame="${HOME}/Documents/faceit/new-project/go-example/client"

if [ -d ${dir} ] ; then
    rm -rf $dir
    cp -r ${orginame} "${HOME}/Documents/faceit/new-project/grind/front-office/"
else 
    cp -r ${orginame} "${HOME}/Documents/faceit/new-project/grind/front-office/"
fi

 cd ${dir}
