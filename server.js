const express = require("express");
const http = require("http");
const cors = require("cors");
const config = require("config");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use(cors());
app.options("*", cors());

const server = http.createServer(app);
const PORT = config.get("server.port") || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
