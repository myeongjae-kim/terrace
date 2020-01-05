#!/usr/bin/env bash

python3 4-myeongjaekim-ecs-service-cf-template.py > 4-myeongjaekim-ecs-service-cf.template

awsecr cloudformation create-stack \
--stack-name myeongjaekim-staging-service \
--capabilities CAPABILITY_IAM \
--template-body file://4-myeongjaekim-ecs-service-cf.template \
--parameters \
ParameterKey=Tag,ParameterValue=latest
