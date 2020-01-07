"""Generating CloudFormation template."""

from troposphere.ecs import (
    TaskDefinition,
    ContainerDefinition,
    Environment
)
from troposphere import ecs
from awacs.aws import (
    Allow,
    Statement,
    Principal,
    Policy
)
from troposphere.iam import Role

from troposphere import (
    Parameter,
    Ref,
    Template,
    Join,
    ImportValue,
    Select,
    Split,
)

from awacs.sts import AssumeRole

t = Template()

t.set_description("myeongjae.kim: ECS service")

t.add_parameter(Parameter(
    "Tag",
    Type="String",
    Default="latest",
    Description="Tag to deploy"
))
t.add_parameter(Parameter(
    "NodeEnv",
    Type="String",
    Default="",
    Description="Runtime environment variables"
))

t.add_resource(TaskDefinition(
    "task",
    ContainerDefinitions=[
        ContainerDefinition(
            Image=Join("", [
                Ref("AWS::AccountId"),
                ".dkr.ecr.",
                Ref("AWS::Region"),
                ".amazonaws.com",
                "/",
                ImportValue("myeongjaekim-repo"),
                ":",
                Ref("Tag")]),
            Memory=957,
            Cpu=1024,
            Name=Select(0, Split("-", Ref("AWS::StackName"))),
            Environment=[Environment(
                Name="node_env",
                Value=Ref("NodeEnv"))],
            PortMappings=[ecs.PortMapping(
                ContainerPort=80)]
        )
    ],
))

t.add_resource(Role(
    "ServiceRole",
    AssumeRolePolicyDocument=Policy(
        Statement=[
            Statement(
                Effect=Allow,
                Action=[AssumeRole],
                Principal=Principal("Service", ["ecs.amazonaws.com"])
            )
        ]
    ),
    Path="/",
    ManagedPolicyArns=[
        'arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceRole']
))

t.add_resource(ecs.Service(
    "service",
    Cluster=ImportValue(
        Join(
            "-",
            [Select(0, Split("-", Ref("AWS::StackName"))),
             Select(1, Split("-", Ref("AWS::StackName"))),
                "cluster-id"]
        )
    ),
    DesiredCount=1,
    TaskDefinition=Ref("task"),
    LoadBalancers=[ecs.LoadBalancer(
        ContainerName=Select(0, Split("-", Ref("AWS::StackName"))),
        ContainerPort=80,
        TargetGroupArn=ImportValue(
            Join(
                "-",
                [Select(0, Split("-", Ref("AWS::StackName"))),
                 Select(1, Split("-", Ref("AWS::StackName"))),
                    "alb-target-group"]
            ),
        ),
    )],
    Role=Ref("ServiceRole")
))

print(t.to_json())
