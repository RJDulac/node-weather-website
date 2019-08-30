const path = require("path");

const express = require("express");
const hbs = require("hbs");

const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const publicDirectoryPath = path.join(__dirname, "../public");

//setup handlebars engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ryan Dulac"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Ryan Dulac"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Ryan Dulac",
    msg: "Welcome to the help page"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      err: "You must provide an address"
    });
  }
  geoCode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({
        err
      });
    }

    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({
          err
        });
      }
      res.send({
        location,
        forecast: forecastData,
        address: req.query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "Article not found",
    title: "404",
    name: "Ryan Dulac"
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    error: "404 page not found",
    title: "404",
    name: "Ryan Dulac"
  });
});

app.listen(port, () => {
  console.log(`Server running is up on port ${port}`);
});
