#!/usr/bin/env python3

import os
import re
rootdir = os.getcwd()

for subdir, dirs, files in os.walk(rootdir):
    for file in subdir:
        os.path.join(subdir, file)
        filepath = subdir + os.sep + file
        arrays = re.split(r"\/",filepath)
        for arr in arrays:
            if arr != "node_modules":
                if arr != ".git":
                    print (filepath)
        #if filepath.endswith(".asm"):
        #    print (filepath)


