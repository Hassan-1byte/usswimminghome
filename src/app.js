const express = require("express");
const path = require("path");
const hbs = require("hbs"); // <--Partials ka code
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 80;

require("./db/conn"); // including Conn file
const ushCollection = require("./models/schema"); // Including Schema file

// Public Static Path
const static_path = path.join(__dirname, "../public"); // <--static stuff ka path
const template_path = path.join(__dirname, "../templates/views"); // <--- views dir ka path
const partials_path = path.join(__dirname, "../templates/partials"); // <--- Partials dir ka path

// Built-in middleware
app.use(express.static(static_path));

// If we dont using POSTMAN
app.use(express.json());

// To get Form Data
app.use(express.urlencoded({ extended: false }));

// To use Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));

// View Engine Specific
app.set("view engine", "hbs");
app.set("views", template_path); // views folder changed to templates
hbs.registerPartials(partials_path); //<= hbs nay partials dir ko register kr liya                                    &&  Auto-Save K Leye => nodemon src/app.js -e js,hbs

// End Points -- Routing
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/coaching", (req, res) => {
  res.render("coaching");
});
app.get("/BuyEquip", (req, res) => {
  res.render("BuyEquip");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.post("/contact", async (req, res) => {
  const PostUsh = new ushCollection({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
  });
  PostUsh.save();
  res.redirect("/");
});

app.get("*", (req, res) => {
  //   <----- Asterik--
  res.render("404error", {
    errorMsg: "OOPS..! Page not found",
  });
});

// Listening on this Port
app.listen(port, () => {
  console.log(`Listening to the port at ${port}`);
});

//////////////////////////////////////////////////////////////////////////
