#!/usr/bin/env bash

python3 ./2-ecs-cluster-cf-template.py > 2-ecs-cluster-cf.template

awsecr cloudformation update-stack \
--stack-name myeongjaekim-staging-cluster \
--capabilities CAPABILITY_IAM \
--template-body file://2-ecs-cluster-cf.template \
--parameters \
ParameterKey=KeyPair,ParameterValue=MjEffectiveDevOpsAWS \
ParameterKey=VpcId,ParameterValue=vpc-d84b50b0 \
ParameterKey=PublicSubnet,ParameterValue=subnet-7105c00a\\,subnet-50552c1c\\,subnet-69170201