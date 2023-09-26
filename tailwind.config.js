/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/layouts/main.handlebars", "./views/partials/comments.handlebars", "./views/homepage.handlebars", "./views/login.handlebars", "./views/searchDetail.handlebars", "./views/signup.handlebars", "./views/venueDetail.handlebars"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

