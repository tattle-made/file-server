const dotenv = require("dotenv");
dotenv.config();

const { connect: connect_to_db } = require("./db");
const { start_listening } = require("./server");

connect_to_db();
start_listening();
