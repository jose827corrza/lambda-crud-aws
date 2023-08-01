const aws = require('aws-sdk');

const sleep = (ms) =>{
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
}
let dynamoDBClientParams = {}

if (process.env.IS_OFFLINE) {
    dynamoDBClientParams =  {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
        secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
    }
}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParams);
const likeUser = async(event, context) => {
    const body = event.Records[0].body
    const userId = JSON.parse(body).id

    console.log(userId)
    const params = {
        TableName: 'usersTable',
        Key: { pk: userId },
        UpdateExpression: "ADD likes :inc",
        ExpressionAttributeValues: {
            ':inc': 1
        },
        ReturnValues: 'ALL_NEW'
    }
    const result = await dynamodb.update(params).promise()
    await sleep(4000)
    console.log(result)
}

module.exports = {
    likeUser
}