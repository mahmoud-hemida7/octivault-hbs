// code for Create an express server //
"use strict";
const { readFileSync, readdirSync, writeFileSync, writeFile } = require("fs");
const fs = require("fs");
var Handlebars = require("handlebars");
const express = require("express");
const simpleGit = require("simple-git");

const StoryblokClient = require("storyblok-js-client");

const exphbs = require("express-handlebars");
const url = require("url");
const app = express();

require("dotenv").config();

// CONFIGURE HBS

// const data = require('./stories.json');
const partials = readdirSync("./views/partials");

// Register partials
for (const partial of partials) {
  if (partial.endsWith(".hbs"))
    Handlebars.registerPartial(
      partial.replace(".hbs", ""),
      readFileSync(`./views/partials/${partial}`, "utf8")
    );
}

// CONFIGURE GIT
// email if it is not working :--> mahmoud.watidy+octivault@gmail.com
const dir = "./octivault";
const USER = "watidy-octivault";
const PASS = "Octivault2022&%";
const REPO = "gitlab.com/mwatidy/octivault";

const remote = `https://${USER}:${PASS}@${REPO}`;

//let git = simpleGit();

(async () => {
  simpleGit().addConfig("user.email", "mahmoud.watidy+octivault@gmail.com");
  simpleGit().addConfig("user.name", "watidy-octivault");

  if (fs.existsSync(dir)) {
    console.log("Directory exists!");
  } else {
    await simpleGit()
      .clone(remote, "octivault")
      .then(() => console.log("finished"))
      .catch((err) => console.error("failed: ", err));
  }
})();

/////////////Configure and initialize storyblok client///////////

let Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOKTOKEN,
});

// 3. Define a add commit push
app.use(express.json()); // for parsing application/json

async function getStoryblok(req, res, next) {
  const { action, story_id } = req.body;
  console.log(action);

  if (action !== "published") return res.send("ok");

  try {
    Storyblok.get(`cdn/stories/${story_id}`, {})
      .then((response) => {
        console.log(response);
        const hbsTemplate = readFileSync("./views/index.hbs", "utf8");
        const hbsLayout = readFileSync("./views/layouts/layout.hbs", "utf8");

        var template = Handlebars.compile(
          hbsLayout.replace("{{{body}}}", hbsTemplate)
        );
        const html = template(response.data);

        fs.writeFileSync(`${response.data.story.name}.html`.toLowerCase(), html, function (err) {
          if (err) {
            return console.log(err);
          }
        });
        res.send(response)
        //res.status(200).send("ok");
        console.log(response.data.story.name)
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {}

  //get story with story_id
  //put data in hbs to render it to html
  //save html output

  // try {
  //   // Add all files for commit
  //   await git().add('./*').then(
  //     (addSuccess) => {
  //         console.log('addSuccess',addSuccess);
  //     }, (failedAdd) => {
  //         console.log('adding  failed');
  //   });

  //   // Commit files as Initial Commit
  //   await git().commit('updated').then(
  //     (successCommit) => {
  //       console.log("successCommit",successCommit);
  //   }, (failed) => {
  //       console.log('failed commmit',failed);
  //   });

  //   // Finally push to online repository
  //   await git().push('origin','main').then((success) => {
  //       console.log(' successfully pushed',success);
  //   },(failed)=> {
  //       console.log(' push failed',failed);
  //   });

  // } catch (error) {
  //   res.send(error)
  // }
}

app.post("/storyblok", getStoryblok);

// 3. Define a wilcard route to get the story mathing the url path
app.get("/*", function (req, res, next) {
  if (req.url.startsWith("/public")) return next();

  var path = url.parse(req.url).pathname;
  path = path == "/" ? "/home" : path;

  Storyblok.get(`cdn/stories${path}`, {
    version: "draft",
  })

    .then((response) => {
      // writeFileSync(__dirname + '/response/' + path + '.json', JSON.stringify(response))

      res.render("index", {
        story: response.data.story,
      });
      
    })
    .catch((error) => {
      res.send(error);
    });
    
    
});
// Handling non matching request from the client

///////////// end of Configure a route and initialize the client ///////////

// route to make a commit after publish
app.get("/index", async (req, res) => {
  try {
    const hbsTemplate = readFileSync("./views/index.hbs", "utf8");
    const hbsLayout = readFileSync("./views/layouts/layout.hbs", "utf8");

    var template = Handlebars.compile(
      hbsLayout.replace("{{{body}}}", hbsTemplate)
    );
    const html = template(data.data);

    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    res.status(500).send("somthing went wrong");
  }
});

// Define your favorite template engine here
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "layout",
    extname: ".hbs",
    partialsDir: "views/partials",
  })
);

app.set("view engine", ".hbs");
app.set("views", "views");
app.use("/public", express.static("public"));

// app.get('*', function(req, res){
//   // res.send('/views/partials/error.hbs');
//   console.log(res.send('not found'))
// });
app.listen(4300, function () {
  console.log("Example app listening on port 4300!");
});
/////////////end of creating server///////////

module.exports = app;
