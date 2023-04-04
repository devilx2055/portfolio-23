import express from "express";
import path from "path";

const __dirname = path.resolve();
const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("pages/home");
});

app.get("/work", (req, res) => {
  res.render("pages/work");
});

app.get("/about", (req, res) => {
  res.render("pages/about");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
