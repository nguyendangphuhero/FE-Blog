#!/bin/bash

if [[ "$EUID" != "0" ]]; then
  echo "You need to run this script as a root user."
  exit 1
fi

# Update package manager
apt update

# Install node
if ! command -v node &> /dev/null
then
  apt install nodejs -y
fi

