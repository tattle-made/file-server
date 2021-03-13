const { fileGetManager: s3FileGetManager, isValidRequest } = require("./s3");
const express = require("express");
const app = express();
const port = 3000;
const { getMetrics } = require("./db");

const { countPing, rateLimiter } = require("./middleware");

app.use(countPing);
app.use(rateLimiter);

app.get("/", (req, res) => {
  res.send("Tattle File Server");
});

app.get("/metrics", (req, res) => {
  console.log("Pinged GET /metrics");
  getMetrics()
    .then((metrics) => res.send(JSON.stringify(metrics)))
    .catch((err) => console.log("error getting metrics", err));
});

app.get("/service/:serviceName/file/:fileName", (req, res) => {
  const { serviceName, fileName } = req.params;

  try {
    if (isValidRequest(serviceName)) {
      const fileStream = s3FileGetManager(serviceName, fileName);

      fileStream.pipe(res);
    } else {
      res.status(404).send("File not found");
    }
  } catch (err) {
    res.status(404).send("File not found");
  }
});

exports.start_listening = () => {
  app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
  });
};
