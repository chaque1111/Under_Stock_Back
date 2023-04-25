const server = require("./src/app");
const {conn} = require("./src/db");

server.listen(5000, () => {
  conn.sync({alter: true});
  console.log("server is listening on port 5000");
});
