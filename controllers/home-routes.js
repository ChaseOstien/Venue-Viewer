const router = require("express").Router();
const { User, Comment } = require("../models/");
const withAuth = require("../utils/auth");
require("dotenv").config();
//const fetchAndDisplayArticles = require('../public/js/fetchArticles.js');
const apiKey = process.env.API_KEY;

async function fetchAndDisplayArticles() {
  const url = `https://app.ticketmaster.com/discovery/v2/venues.json?apikey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  //console.log(data);
  return data._embedded.venues;
}

async function fetchAndDisplayOneArticle(id) {
  const url = `https://app.ticketmaster.com/discovery/v2/venues/${id}.json?apikey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log("inside function", data);
  return data;
}

async function fetchAndDisplaySearchArticles(keyWord) {
  const url = `https://app.ticketmaster.com/discovery/v2/venues.json?keyword=${keyWord}&apikey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data._embedded.venues);
  return data._embedded.venues;
}

router.get("/", withAuth, async (req, res) => {
  try {
    const result = await fetchAndDisplayArticles();
    res.render("homepage", { result, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/venue/:id", withAuth, async (req, res) => {
  try {
    const result = await fetchAndDisplayOneArticle(req.params.id);
    //console.log("this is the one: ", result);

    const commentData = await Comment.findAll({
      where: { venue_id: req.params.id + "/" },
      include: [User],
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    //console.log(comments);

    res.render("venueDetail", {
      result,
      logged_in: req.session.logged_in,
      comments,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/search/:keyword", withAuth, async (req, res) => {
  try {
    console.log(req.params.keyword);
    const result = await fetchAndDisplaySearchArticles(req.params.keyword);
    //console.log(result);
    console.log(req.session.logged_in);
    res.render("homepage", { result, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/search", withAuth, async (req, res) => {
  try {
    console.log("post key");
    console.log(req.body.keyword);
    res.redirect("/search/" + req.body.keyword);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
