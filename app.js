
// code for Create an express server //
'use strict';
const { readFileSync, readdirSync, writeFileSync,  } = require('fs');
const fs = require('fs');
var Handlebars = require('handlebars');
const express = require('express');
const simpleGit = require('simple-git');
const git = require('simple-git/promise');

const StoryblokClient = require('storyblok-js-client');

const exphbs = require('express-handlebars');
const url = require('url');
const app = express();

require('dotenv').config();

// CONFIGURE HBS 

// const data = require('./stories.json');
const partials = readdirSync('./views/partials')

// Register partials
for (const partial of partials) {
  if (partial.endsWith('.hbs')) Handlebars.registerPartial(partial.replace('.hbs', ''), readFileSync(`./views/partials/${partial}`, 'utf8'));
}

// CONFIGURE GIT 
// email if it is not working :--> mahmoud.watidy+octivault@gmail.com
const dir = './octiClone';
const USER = 'watidy-octivault';
const PASS = 'Octivault2022&%';
const REPO = 'gitlab.com/mwatidy/octivault';

const remote = `https://${ USER }:${ PASS }@${ REPO }`;

 //let git = simpleGit();

(async () => {
  simpleGit().addConfig('user.email','mahmoud.watidy+octivault@gmail.com');
  simpleGit().addConfig('user.name','watidy-octivault');

  if (fs.existsSync(dir)) {
    console.log('Directory exists!');
  } else {
    await git().silent(true)
    .clone(remote ,'octiClone')
    .then(() => console.log('finished'))
    .catch((err) => console.error('failed: ', err));
  }

 // clone repo from remote
  // --------------------------------------------------

  // const SimpleGit = simpleGit({ 
  //   baseDir: process.cwd() + '/build',
  //   binary: 'git',
  //   maxConcurrentProcesses: 6,
  //   config: [
  //     'http.proxy=someproxy'
      
  //   ]});
  
  //  ===>  TODO FOR NEXT TIME  <====
  
  // - FINISH GIT OPS
  // - HEROKU
  // - ERROR HANDLING
    
    
})();

/////////////Configure and initialize storyblok client///////////

let Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOKTOKEN
});


// 3. Define a wilcard route to get the story mathing the url path
async function geStoryblok(req, res, next){

  try {
    // Add all files for commit
    await git().add('./*')
    
    .then(
      (addSuccess) => {
          console.log('addSuccess',addSuccess);
      }, (failedAdd) => {
          console.log('adding  failed');
    });

    // Commit files as Initial Commit
    await git().commit('updated')
    .then(
      (successCommit) => {
        console.log("successCommit",successCommit);
    }, (failed) => {
        console.log('failed commmit',failed);
    });

    // Finally push to online repository
    await git().push('origin','main')
    .then((success) => {
        console.log(' successfully pushed');
    },(failed)=> {
        console.log(' push failed');
    }); 
    
  } catch (error) {
    res.send(error)
  }

}

app.get('/storyblok/',geStoryblok )

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
    geStoryblok(req, res, next)
    .then((response) => {

      // writeFileSync(__dirname + '/response/' + path + '.json', JSON.stringify(response))
      
      res.render('index', {
        story: response.data.story
      });
      
      
    })
    .catch((error) => {
      res.send(error);
    });
    
});


///////////// end of Configure a route and initialize the client ///////////


// route to make a commit after publish
app.get('/index', async (req, res) => {

    try {

    const hbsTemplate = readFileSync('./views/index.hbs', 'utf8');
    const hbsLayout = readFileSync('./views/layouts/layout.hbs', 'utf8');

    var template = Handlebars.compile(hbsLayout.replace('{{{body}}}', hbsTemplate));
    const html = template(data.data);



    // ------ Push file change to git -------//
    

    // - save file to folder --- page-name.html
    // - git add 
    // - git commit -m "updated " + filename
    // - git push origin master


    res.status(200).send('ok');
  
  } catch (error) { 
    console.error(error);
    res.status(500).send('somthing went wrong');

  }

})



// Define your favorite template engine here
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'layout',
  extname: '.hbs',
  partialsDir: 'views/partials',
  
}));
 
app.set('view engine', '.hbs');
app.set('views', 'views')
app.use('/public', express.static('public'));

app.listen(4300, function() {
  console.log('Example app listening on port 4300!');
});
/////////////end of creating server///////////


module.exports = app;