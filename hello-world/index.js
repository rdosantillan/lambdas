'use strict';

console.log('Loading function');

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event.body, null, 2));

    console.log();
    const body = JSON.parse(event.body);
    console.log('value1 =', body.key1);
    console.log('value2 =', body.key2);
    console.log('value3 =', body.key3);
    console.log('value4 =', body.key4);

    var response = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify('Welcome ' + body.key3 + ' ' + body.key4
                 + '! Your age: ' + body.key1
                 + ' Your Fav number:' + body.key2
                 + ' End of message'),
        "isBase64Encoded": false
    };

    callback(null, response);  // Echo back the first key value
    //callback('Something went wrong');
};

