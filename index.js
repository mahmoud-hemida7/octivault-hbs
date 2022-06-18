
// code for Create an express server //
'use strict';
 
const express = require('express');
const exphbs = require('express-handlebars');
const url = require('url');
const app = express();

/////////////Configure a route and initialize the client///////////

// 1. Require the Storyblok JS client
const StoryblokClient = require('storyblok-js-client');
 
// 2. Initialize the client
// You can use this preview token for now, we'll change it later
let Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOKTOKEN
});
 
// 3. Define a wilcard route to get the story mathing the url path
app.get('/*', function(req, res) {
  var path = url.parse(req.url).pathname;
  path = path == '/' ? 'home' : path;
 
  Storyblok
    .get(`cdn/stories${path}`, {
      version: req.query._storyblok ? 'draft': 'published'
    })
    .then((response) => {
      res.render('index', {
        story: response.data.story
      });
    })
    .catch((error) => {
      res.send(error);
    });
});
///////////// end of Configure a route and initialize the client///////////
 
app.use('/public', express.static('public'));
 
// Define your favorite template engine here
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'layout',
  extname: '.hbs',
  partialsDir: 'views/partials'
}));
 
app.set('view engine', '.hbs');
app.set('views', 'views')
 
app.listen(4300, function() {
  console.log('Example app listening on port 4300!');
});
/////////////end of creating server///////////


