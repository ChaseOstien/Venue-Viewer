const router = require("express").Router();
const { User, Comment } = require("../models/");
const withAuth = require("../utils/auth");

async function fetchAndDisplayArticles() {
  const url =
    "https://app.ticketmaster.com/discovery/v2/venues.json?apikey=KhmZhazbRv5fZzhMfN38QaddApQaAfR0";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "48085eadd3mshbc89d6c2943fe3dp142394jsnc647e445b0a3",
      "X-RapidAPI-Host": "flixster.p.rapidapi.com",
    },
  };

  const response = await fetch(url);
  const data = await response.json();
  //console.log(data);
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
  // console.log("inside function",data);
  return data;
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
      where: { venue_id: req.params.id+"/" },
      include: [User],
    });
      const comments = commentData.map((comment) =>
       comment.get({ plain: true })
     );
     console.log(comments);

    res.render("venueDetail", {
      result,
      logged_in: req.session.logged_in,
      comments,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;