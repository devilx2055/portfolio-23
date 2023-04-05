import express from "express";
import path from "path";

const __dirname = path.resolve();
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("pages/home", {
    title: "Home",
  });
});

app.get("/work", (req, res) => {
  res.render("pages/work", {
    title: "Work",
  });
});

app.get("/about", (req, res) => {
  res.render("pages/about", {
    title: "About",
  });
});

app.get("/contact", (req, res) => {
  res.render("pages/contact", {
    title: "Contact",
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
