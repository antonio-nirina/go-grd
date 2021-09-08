#!/bin/bash



for file in /admin/*
do
    if [[ -f $file ]]; then
       echo $file
    fi
done

