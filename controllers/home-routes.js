const router = require("express").Router();
const { User } = require("../models/");
const withAuth = require("../utils/auth");
//const fetchAndDisplayArticles = require('../public/js/fetchArticles.js');


async function fetchAndDisplayArticles() {
  const url =
    "https://app.ticketmaster.com/discovery/v2/venues.json?apikey=KhmZhazbRv5fZzhMfN38QaddApQaAfR0";
  

    const response = await fetch(url);
    const data = await response.json();
    //console.log(data);
    return data._embedded.venues;
}

async function fetchAndDisplaySearchArticles(keyWord) {
  const url =`https://app.ticketmaster.com/discovery/v2/venues.json?keyword=${keyWord}&apikey=KhmZhazbRv5fZzhMfN38QaddApQaAfR0`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data._embedded.venues;
}

async function fetchAndDisplayOneArticle(id) {
  const url = `https://app.ticketmaster.com/discovery/v2/venues/${id}.json?apikey=KhmZhazbRv5fZzhMfN38QaddApQaAfR0`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "48085eadd3mshbc89d6c2943fe3dp142394jsnc647e445b0a3",
      "X-RapidAPI-Host": "flixster.p.rapidapi.com",
    },
  };

  const response = await fetch(url);
  const data = await response.json();
  console.log("inside function",data);
  return data;
}

router.get("/search", withAuth, async (req, res) => {
  try {
    const result = await fetchAndDisplaySearchArticles(keyWord);
    console.log(result);
    res.render("homepage", { result, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/search', withAuth, async (req, res) => {
  try {
    console.log('Hello')
    req.session.save(() => {
      req.session.keyWord = req.body.keyWord;
    });
    res.redirect('/search');
  } catch (err) {
    res.status(500).json(err);
  }
})




router.get("/", withAuth, async (req, res) => {
  try {
    const result = await fetchAndDisplayArticles();
    
    res.render("homepage", {result,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/login", (req, res) => {
  try {
  if (req.session.logged_in) {
    res.redirect("/");
  } else {
    res.render("login");
  }
} catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});





router.get("/:id", withAuth, async (req, res) => {
  try {
    const result = await fetchAndDisplayOneArticle(req.params.id);
    console.log("this is the one: ", result);

    res.render("venueDetail", { result, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
