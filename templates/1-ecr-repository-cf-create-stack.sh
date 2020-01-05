#!/usr/bin/env bash

python3 1-ecr-repository-cf-template.py > 1-ecr-repository-cf.template

awsecr cloudformation create-stack \
--stack-name myeongjaekim-ecr \
--capabilities CAPABILITY_IAM \
--template-body file://1-ecr-repository-cf.template \
--parameters \
ParameterKey=RepoName,ParameterValue=myeongjaekim
