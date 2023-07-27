# SERVERLESS CRUD USING AWS LAMBDA

This repo includes the scripts used to create a simple CRUD which uses some AWS services such as:

- API Gateway
- DynamoDB
- Lambda

Also is used serverless framework.

first will be used Javascript, later on Golang.. and maybe Python jaj

## Local Testing

Using the following command is possible to debug in loca

`serverless offline start`

Very important before use the command above, have included the plugin into the serverless file

Another important theme is currently the repo contains a workflow file which specifies that every time a pull request to main is generated, this will run some tests and later will automate the deploy to the AWS cloud.

**CURRENTLY** is disabled due to security issues


*Road to AWS Cloud Practitioner Certification*