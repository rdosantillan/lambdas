# lambdas


#### Steps to deploy a lambda manually

```bash

# Create a role
aws iam create-role --role-name lambda-ex --assume-role-policy-document '{"Version": "2012-10-17","Statement": [{ "Effect": "Allow", "Principal": {"Service": "lambda.amazonaws.com"}, "Action": "sts:AssumeRole"}]}'


# zip your lambda
zip function.zip index.js

# create function
aws lambda create-function --function-name hello-world-function \
--zip-file fileb://function.zip --handler index.handler --runtime nodejs14.x \
--role arn:aws:iam::401202591305:role/lambda-ex

aws lambda invoke --function-name hello-world-function out --log-type Tail

aws lambda invoke --function-name hello-world-function out --log-type Tail \
--query 'LogResult' --output text |  base64 -d

# list lambda functions
aws lambda list-functions --max-items 10


# delete a lambda 
aws lambda delete-function --function-name hello-world-function


```

#### AWS cloudformation deploy a lambda

```bash
zip function.zip index.js

# Upload zip to centralized bucket
aws s3api put-object \
  --body function.zip \
  --bucket lambdas-zips-us-east-1-wk3v4d \
  --key hello-world/function.zip


# Deploy lambda with cloudformation
aws cloudformation deploy --template-file template.yml \
    --stack-name dev-helllo-world \
    --parameter-overrides \
    Env=dev LambdaName=hello-world \
    --tags Env=Dev Course=DevOps \
    --capabilities CAPABILITY_IAM


aws lambda invoke \
  --function-name dev-helllo-world-helloworld-YnVQ6sQQIZZZ \
  out --log-type Tail \
  --query 'LogResult' --output text |  base64 -d



sam package \
  --template-file template.yml \
  --output-template-file package.yml \
  --s3-bucket lambdas-zips-us-east-1-wk3v4d \
  --s3-prefix hello-world

sam deploy --template-file package.yml \
  --stack-name dev-hello-world \
  --parameter-overrides Env=dev LambdaName=hello-world \
  --capabilities CAPABILITY_IAM


sam invoke local “HelloWorldFunction” -e events / event.json

```
