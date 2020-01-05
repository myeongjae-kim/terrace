#!/usr/bin/env bash

python3 6-myeongjaekim-codepipeline-cf-template.py > 6-myeongjaekim-codepipeline-cf.template

awsecr cloudformation create-stack \
--stack-name myeongjaekim-codepipeline \
--capabilities CAPABILITY_NAMED_IAM \
--template-body file://6-myeongjaekim-codepipeline-cf.template