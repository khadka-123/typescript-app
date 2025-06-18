import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });

const s3 = new AWS.S3();

s3.listBuckets((err: AWS.AWSError, data: AWS.S3.ListBucketsOutput) => {
  if (err) console.error("Error", err);
  else console.log("Buckets:", data.Buckets);
});
