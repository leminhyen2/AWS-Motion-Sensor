// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

// Setup AWS
AWS.config = new AWS.Config();
AWS.config.accessKeyId = "PUT YOUR OWN KEY HERE";
AWS.config.secretAccessKey = "PUT YOUR OWN KEY HERE";
AWS.config.region = "ap-northeast-1";

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// Generate mock data and format it into the correct DynamoDB format
let arrayResult = []
for (let i = 0; i <=100; i++) {
    let dataObject = {
        "distance": Math.floor(Math.random() * 101),
        "time": i,
        //"time": new Date(),
        "unit": "cm"
    };
    // the proper format of DynamoDB batch request
    var params = {
        PutRequest: {
            Item: {
          'ID' : {N: `${i}`},
          'DATA' : {S: JSON.stringify(dataObject)}
        }
       }
      };   
    arrayResult.push(params)
}

// Put JSON string into DynamoDB
var params = {
    RequestItems: {
      "GREENGRASS": arrayResult
    }
  };
  
// Declare DynamoDB to put multiple items to the table
function putItemIntoDB() {
    ddb.batchWriteItem(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data);
        }
      });  
}

// Call function 
putItemIntoDB()

// Use function below to put items to table every 2 seconds
// setInterval(putItemIntoDB(), 2000); 
