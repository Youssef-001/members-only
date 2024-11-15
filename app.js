let express = require("express");
let path = require("path");
let app = express();
app.use(express.urlencoded({ extended: false }));

let memberController = require("./controllers/memberController");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

app.post("/sign-up", (req, res) => {
  memberController.addMember(req, res);
});

app.listen(3000, (req, res) => {});
