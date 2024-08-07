const app = require("./app");
const connectionDatabase = require("./config/db");
const { serverPort } = require("./secret");

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(serverPort, async () => {
  console.log(`server is running at http://localhost:${serverPort}`);
  await connectionDatabase();
});
