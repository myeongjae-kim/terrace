#!/usr/bin/env bash

python3 5-myeongjaekim-codebuild-cf-template.py > 5-myeongjaekim-codebuild-cf.template

awsecr cloudformation create-stack \
--stack-name myeongjaekim-codebuild \
--capabilities CAPABILITY_IAM \
--template-body file://5-myeongjaekim-codebuild-cf.template