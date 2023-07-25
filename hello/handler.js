
const hello = async (event, context) => {
    return {
        "statusCode": 200,
        "body": JSON.stringify({ 'message': 'Hola mundo AWS joseDev'})
    }
}

module.exports = {
    hello
}
