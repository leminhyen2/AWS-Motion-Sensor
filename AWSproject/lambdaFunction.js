//PUT THIS CODE INTO LAMBDA FUNCTION

//AWS-SDK IS A BUILT-IN PACKAGE IN LAMBDA 
//PUT THIS OUTSIDE EXPORTS.HANDLE SO FUNCTION WON'T TIMEOUT 
var AWS = require('aws-sdk');

//DEFAULT FUNCTION DECLARE 
exports.handler = async (event) => {

//DECLARE AWS PARAMETERS
AWS.config = new AWS.Config();
AWS.config.accessKeyId = "Put Your Own Key Here";
AWS.config.secretAccessKey = "Put Your Own Key Here";
AWS.config.region = "ap-northeast-1";

//Create the DynamoDB service object
var docClient = new AWS.DynamoDB.DocumentClient();

//DECLARE PARAMETERS FOR DYNAMODB
var params = {
    TableName : "GREENGRASS",
    ScanIndexForward: true, //RECORDS SHOWN IN ASCENDING ORDER
    Limit: 100
};
  
//CALL DYNAMODB TO RETRIEVE DATA
let result = new Promise((resolve,reject) => {
  docClient.scan(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
      resolve(data)
    }
  });
})

//SEND RESPONSE TO FRONT-END
const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      },
      body: JSON.stringify(await result)
    };

return response
}