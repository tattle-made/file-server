const AWS = require("aws-sdk");
const S3 = new AWS.S3({
  region: "ap-south-1",
});

const serviceBucketMap = {
  sharechat: process.env.SHARECHAT_BUCKET,
  factcheck: process.env.FACTCHECK_BUCKET,
  kosh: process.env.KOSH_BUCKET,
};

exports.isValidRequest = (serviceName) => {
  return serviceName in serviceBucketMap;
};

//todo send a 404 for file not exists case
exports.fileGetManager = (serviceName, fileName) => {
  try {
    const fileStream = S3.getObject({
      Bucket: serviceBucketMap[serviceName],
      Key: fileName,
    }).createReadStream();
    fileStream.on("error", (err) => {
      console.log(err);
      throw new Error("Something went wrong with the file stream");
    });
    return fileStream;
  } catch (err) {
    console.log(err);
    console.log(`Error : could not access ${fileName} of ${serviceName}`);
    throw err;
  }
};
