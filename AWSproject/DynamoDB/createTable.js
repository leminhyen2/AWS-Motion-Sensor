// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

// Setup AWS
AWS.config = new AWS.Config();
AWS.config.accessKeyId = "PUT YOUR OWN KEY HERE";
AWS.config.secretAccessKey = "PUT YOUR OWN KEY HERE";
AWS.config.region = "ap-northeast-1";

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// Set up table to your liking 
var params = {
  AttributeDefinitions: [
    {
      AttributeName: 'ID',
      AttributeType: 'N'
    },
    {
      AttributeName: 'DATA',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'ID',
      KeyType: 'HASH'
    },
    {
      AttributeName: 'DATA',
      KeyType: 'RANGE'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  TableName: 'GREENGRASS',
  StreamSpecification: {
    StreamEnabled: false
  }
};

// Call DynamoDB to create the table
ddb.createTable(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Table Created", data);
  }
});