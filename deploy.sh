#!/bin/bash


for file in ${HOME}/Documents/faceit/new-project/go-example/client/*
do
   if [[ -d $file || -f $file ]]; then
      #echo $file
   else 
      echo "not files" 
   fi
done



