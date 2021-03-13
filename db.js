const { MongoClient } = require("mongodb");
const { DB_URL, DB_NAME, DB_COLLECTION_NAME } = process.env;
const client = MongoClient(DB_URL, { useUnifiedTopology: true });

let db, collection;

exports.connect = () => {
  client
    .connect()
    .then((res) => {
      console.log("Success Connecting to Database");
      db = client.db(DB_NAME);
      collection = db.collection(DB_COLLECTION_NAME);
    })
    .catch((err) => console.log("Error connecting to db ", err));
};

exports.updateCounter = (count) => {
  console.log(count);

  const filter = { key: "sharechat-media-access" };
  const options = { upsert: true };
  const updateDoc = {
    $inc: {
      count: count,
    },
    $set: { updated_at: new Date() },
  };
  return collection
    .updateOne(filter, updateDoc, options)
    .then((res) => console.log("Success Updating Metrics"))
    .catch((err) => {
      console.log("Error Updating Metrics");
    });
};

exports.getMetrics = () => {
  return collection
    .findOne({ key: "sharechat-media-access" })
    .catch((err) => console.log("Error Getting Metrics"));
};
