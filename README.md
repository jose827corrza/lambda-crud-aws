# SERVERLESS CRUD USING AWS LAMBDA

This repo includes the scripts used to create a simple CRUD which uses some AWS services such as:

- API Gateway
- DynamoDB
- Lambda

Also is used serverless framework.

first will be used Javascript, later on Golang.. and maybe Python jaj

## Serverless Diagram

The integrations of the different services provided by AWS and how they are connected is shown below.

[![serverless-diagram.png](https://i.postimg.cc/VsX4fHmg/serverless-diagram.png)](https://postimg.cc/yWY0njJ3)


## Create a new user

From the AWS API Gateway, some schema validation can be performed from here. This service can  validate the fields that are required, and its types. in the "schemas" folder is settle the validation used in APIGateway.

In order to successfully create a new user with a valid request, here is shown an example.

```json
{
    "name": "Daniel",
    "lastName": "Corredor",
    "phone": "3059044855",
    "age": 26,
    "email": "jose.bestemailever@gmail.com"
}
```

Before  send it, you must configure an header called "Authorization", because a customer authorization was used. where the value must follow the following shape:
>Bearer ak69B1IxNm4fQf2yttCbp4w7cEXAMPLE

In order to be authenticated.

After this process you will receive a response like this, where it shows the pk or id assigned to the new user storaged in the DynamoDB.

```json
{
    "user": {
        "name": "Daniel",
        "lastName": "Corredor",
        "phone": "3059044855",
        "age": 26,
        "email": "jose.corrzadeveloper@gmail.com",
        "pk": "066ce86d-fca9-4cc7-adbc-91cb654708f7"
    }
}
```

## Getting an User

As AWS costs as you use  their resources, a "get all" make no viable as long as you increase the users DB, only a get an specific user was develop.

In order to continue with the documentation the  id obtained from the creation of the user will be used in this part.

This function is also protected by API Gateway, but APIKeys were used here, the change is in the header, where the header name will be "x-api-key" an the value consist only in the key previously provided (without Bearer word at the begining).

Lastly to indicate the userId  must be send by pathParameter, following  the path.

> <aws_api_gateway_dns>/users/{userId}

The response body follows this structure.

```json
{
    "user": {
        "lastName": "Corredor",
        "pk": "066ce86d-fca9-4cc7-adbc-91cb654708f7",
        "email": "jose.corrzadeveloper@gmail.com",
        "name": "Daniel",
        "phone": "3059044855",
        "age": 26
    }
}
```

## Updating phone number

For this operation, is required a valid request body and a userId, this lastone will be set as pathParameter as before.

As request only is required the field phone. For auth  will be used the  APIKeys method for easeness. An important comment is PATCH HTTP method is used

> <aws_api_gateway_dns>/users/{userId}

## Deleting User

Only is required the userId and used as pathParameters, woth DELETE HTTP method

> <aws_api_gateway_dns>/users/{userId}

## Sign Image URL

As well as the previous endpoints, APIKeys auth is used, the main purpose of this endpoint is to generate an endpoint for a given image name, this will work for increase the security on what kind of stuff of file format binaries will be uploaded into the S3 bucket.
To set the image name, you must use the query param "name"

## Uploading image

With the given URL, and PUT HTTP method you can upload the image **ENSURE THIS IMAGE HAS .png OR .jpg FORMAT FILE**. As soon as you upload the image you will receive a statusCode 200, everything wnet OK.

## S3 Event (Thumbnail)
This functions is triggered when an image has been uploaded into the "upload" file inside the bucket, this method will perform a resize of the image into three different sizes, and this resized images will be storaged in a new folder called "resized". The new sizes are: 50, 100 and 200 pixels. This is possible by using sharp library for NodeJs.

## Like User Lambda

The last function implemented is an endpoint that receives is its requestBody an id field, that corresponds to the userId that we want to give a like, after this, the AWS SQS service set this information into a created queue to enable the async operation of the flow without overflow it.  At some time a lambda function will  receive this message and will perform the writting into the db to the given user.


## Local Testing

Using the following command is possible to debug in loca

`serverless offline start`

Very important before use the command above, have included the plugin into the serverless file

Another important theme is currently the repo contains a workflow file which specifies that every time a pull request to main is generated, this will run some tests and later will automate the deploy to the AWS cloud.

**CURRENTLY** is disabled due to security issues


## How to get the logs from a lambda from my terminal ?

`sls logs --function <function_name>`

*Road to AWS Cloud Practitioner Certification*