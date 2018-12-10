const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());

var navbar = require("./navbar");
var home = require("./home");
var programme = require("./programme");
var events = require("./events");
var partners = require("./partners");
var festivalreports = require("./festivalreports");
var general = require("./general");
var review = require("./review");
var anniversary = require("./anniversary");
var contactPersons = require("./contactPersons");
var event = require("./event");
var posts = require("./posts");
var newsArticle = require("./newsArticle");
var newsYearList = require("./newsYearList");
var scheduledLiveStream = require("./scheduledLiveStream");
var contactAddress = require("./contactAddress");
var venues = require("./venues");
var eventList = require("./eventList");
var eventYearList = require("./eventYearList");
var adminUsers = require("./adminUsers");
var livestream = require("./livestream");
var settings = require("./settings");
var adminLogin = require("./adminLogin");

app.get("/", (req, res) => {
  /*fix*/
  res.send("jille greiå");
});

app.use("/api/navbar", navbar);
app.use("/api/home", home);
app.use("/api/programme", programme);
app.use("/api/events", events);
app.use("/api/partners", partners);
app.use("/api/festivalreports", festivalreports);
app.use("/api/general", general);
app.use("/api/review", review);
app.use("/api/anniversary", anniversary);
app.use("/api/contactPersons", contactPersons);
app.use("/api/event", event);
app.use("/api/posts", posts);
app.use("/api/newsArticle", newsArticle);
app.use("/api/newsYearList", newsYearList);
app.use("/api/scheduledLiveStream", scheduledLiveStream);
app.use("/api/contactAddress", contactAddress);
app.use("/api/venues", venues);
app.use("/api/eventList", eventList);
app.use("/api/eventYearList", eventYearList);
app.use("/api/adminUsers", adminUsers);
app.use("/api/livestream", livestream);
app.use("/api/settings", settings);
app.use("/api/adminLogin", adminLogin);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
