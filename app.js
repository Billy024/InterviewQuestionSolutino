const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const authRoutes = require("./routes/auth");

const app = express();

// Connect to the database
mongoose.connect("mongodb://localhost:27017/interviewApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use((req, res, next) => {
  console.log("Session Data in middleware:", req.session);
  next();
});

app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  if (req.session.user && req.session.totalUserLength) {
    res.send(
      `Welcome. Your name is : ${req.session.user.username}. ${req.session.totalUserLength} users have signed up so far!`
    );
  } else {
    res.status(401).send("Unauthorized access");
  }
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.use(authRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
