#!/usr/bin/env bash

echo "generating .gitHash.json"
bash get_head.sh
echo "build and push images"
printenv DOCKER_PASSWORD | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t codeforpoznan/pah-fm-frontend:latest frontend
docker build -t codeforpoznan/pah-fm-backend:latest  backend
docker push codeforpoznan/pah-fm-frontend
docker push codeforpoznan/pah-fm-backend

echo "build and push statics"
mkdir public
(cd frontend && npm     run       build                    && cp -r dist/* ../public)
(cd backend  && python3 manage.py collectstatic --no-input && cp -r static ../public)
aws s3         sync                --delete public s3://codeforpoznan-public/dev_pah_fm
aws cloudfront create-invalidation --paths "/*" --distribution-id EEQ58KIXKBEQ9

echo "bundle application"
pip install -r backend/requirements/base.txt --target packages
(cd packages && rm -rf *-info && zip -qgr9 ../lambda.zip .)
(cd backend  && rm -rf static && zip -qgr9 ../lambda.zip .)

echo "upload lambdas"
aws s3 cp lambda.zip s3://codeforpoznan-lambdas/dev_pah_fm_serverless_api.zip
aws s3 cp lambda.zip s3://codeforpoznan-lambdas/dev_pah_fm_migration.zip

echo "refresh lambdas"
aws lambda update-function-code                           \
  --function-name dev_pah_fm_serverless_api               \
  --s3-bucket     codeforpoznan-lambdas                   \
  --s3-key        dev_pah_fm_serverless_api.zip           \
  --region        eu-west-1                               \
| jq 'del(.Environment, .VpcConfig, .Role, .FunctionArn)' \

aws lambda update-function-code                           \
  --function-name dev_pah_fm_migration                    \
  --s3-bucket     codeforpoznan-lambdas                   \
  --s3-key        dev_pah_fm_migration.zip                \
  --region        eu-west-1                               \
| jq 'del(.Environment, .VpcConfig, .Role, .FunctionArn)' \

echo "run migrations"
aws lambda invoke                                         \
  --function-name dev_pah_fm_migration                    \
  --region        eu-west-1                               \
  response.json                                           \
> request.json                                            \

echo "show migration output"
jq -s add ./*.json | jq -re '
  if .FunctionError then
    .FunctionError, .errorMessage, false
  else
    .stdout, .stderr
  end'

exit $?
