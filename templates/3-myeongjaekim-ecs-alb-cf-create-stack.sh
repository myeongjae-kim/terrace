#!/usr/bin/env bash

python3 3-myeongjaekim-ecs-alb-cf-template.py > 3-myeongjaekim-ecs-alb-cf.template

awsecr cloudformation create-stack \
--stack-name myeongjaekim-staging-alb \
--capabilities CAPABILITY_IAM \
--template-body file://3-myeongjaekim-ecs-alb-cf.template
