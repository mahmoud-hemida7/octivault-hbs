
// code for Create an express server //
'use strict';
 
const express = require('express');
const exphbs = require('express-handlebars');
const { writeFileSync } = require('fs');
const url = require('url');
const app = express();

require('dotenv').config();

/////////////Configure a route and initialize the client///////////



// 1. Require the Storyblok JS client
const StoryblokClient = require('storyblok-js-client');
const { nextTick } = require('process');
 
// 2. Initialize the client
// You can use this preview token for now, we'll change it later

let Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOKTOKEN
});
 

// 3. Define a wilcard route to get the story mathing the url path
app.get('/*', function(req, res, next) {

  if (
    req.url.startsWith('/public') 
  ) return next();

  
  var path = url.parse(req.url).pathname;
  path = path == '/' ? '/home' : path;

  Storyblok
    .get(`cdn/stories${path}`, {
      version: 'draft'
    })
    .then((response) => {

      writeFileSync(__dirname + '/response/' + path + '.json', JSON.stringify(response))
      res.render('index', {
        story: response.data.story
      });

    })
    .catch((error) => {
      res.send(error);
    });
});
///////////// end of Configure a route and initialize the client///////////
 

 
// Define your favorite template engine here
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'layout',
  extname: '.hbs',
  partialsDir: 'views/partials'
}));
 
app.set('view engine', '.hbs');
app.set('views', 'views')
app.use('/public', express.static('public'));

app.listen(4300, function() {
  console.log('Example app listening on port 4300!');
});
/////////////end of creating server///////////


