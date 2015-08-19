#!/bin/bash

html_path="th.physik.uni-frankfurt.de:public_html/"
all_files=$(git ls-tree -r HEAD --name-only)
send_files=$(echo $all_files | awk '{gsub("install.sh|.gitignore|content.md|.tern-project","");print}')

#scp $send_files $html_path
echo $send_files
