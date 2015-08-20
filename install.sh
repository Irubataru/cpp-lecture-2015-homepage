#!/bin/bash

# Some script constants
exclude_files=("install.sh" "content.md")
ssh_domain="th.physik.uni-frankfurt.de"
website_folder="public_htm/"

# Test if I am currently on the master branch
master_branch="master"
current_branch="$(git rev-parse --abbrev-ref HEAD | sed -e 's/[[:space:]]//g')"

if [ $current_branch != $master_branch ] ; then
  echo "Not on $master_branch, are you sure you want to push website?"
  select updaterepo in "Yes" "No"; do
    case $updaterepo in
      Yes ) break;;
      No ) exit
    esac
  done
fi

# Put together the exclude flags to pass to the rsync function
exclude_flag="--exclude=.git"

for file in "${exclude_files[@]}" ; do
  exclude_flag="$exclude_flag --exclude=$file"
done

# Create the ssh path
ssh_path=$ssh_domain":"$website_folder

# Finally send it all to the server
rsync -PSauve ssh $exclude_flag * $ssh_path
