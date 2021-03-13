// view counter  imports
const { updateCounter: updateViewCount } = require("./db");
const { UPDATE_METRIC_THRESHOLD } = process.env;
let currentViewCount = 0;

// rate limiter  imports
const rateLimit = require("express-rate-limit");

exports.countPing = (req, res, next) => {
  console.log("Counting View ", currentViewCount);
  if (
    currentViewCount !== 0 &&
    currentViewCount % UPDATE_METRIC_THRESHOLD === 0
  ) {
    updateViewCount(currentViewCount);
    currentViewCount = 0;
  } else {
    currentViewCount++;
  }

  next();
};

exports.rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
});
