#!/bin/bash

# git archive -o blog_fe.zip HEAD
npm install
npm run build

ls

apt update
apt install zip -y

cd build && ls && zip -r blog_frontend.zip .
aws s3 cp blog_frontend.zip s3://bill-bucket-ca-central-1
