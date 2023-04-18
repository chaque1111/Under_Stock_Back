const server = require("./src/app");
const {conn} = require("./src/db");

server.listen(8080, () => {
  conn.sync({force: false});
  console.log("server is listening on port 8080");
});
