import bodyParser from "body-parser";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import fs from "fs";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flag: "a",
});
app.use(morgan("tiny", { stream: accessLogStream }));
function logger(req, res, next) {
  console.log("Request Method: ", req.method);
  console.log("Request URL: ", req.url);
  next();
}
app.use(logger);

app.get("/", (req, res) => {
  console.log(__dirname);
  //   res.send("HEllo world");
  res.sendFile(__dirname + "/public/index.html");
});
app.use(bodyParser.urlencoded({ extended: true }));

function checkPassword(req, res, next) {
  console.log(req.body);
  const { password } = req.body;
  // let password = res.body["password"];
  if (password != "ILoveProgramming") {
    // res.send(`<p>Wrong Password!</p>`);
    res.sendFile(__dirname + "/public/index.html");
  }
  next();
}
app.use(checkPassword);
app.post("/check", (req, res) => {
  console.log(req.body);
  res.sendFile(__dirname + "/public/secret.html");
});
app.post("/submit", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}. `);
});
