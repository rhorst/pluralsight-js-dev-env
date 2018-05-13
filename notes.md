Notes from "Building a JS Dev Environment (boilerplate/ starter kit)" from pluralsight, cory House
======================================================================================================

Pick an Editor
--------------
Pick an editor that's goot at processing JS code. Popular ones that are free or low cost are Webstorm, Atom, Bracket, and VSCode.


Setting Up .editorconfig
------------------------
An editor config file allows you to maintain consistency among projects and team members' developing styles by creating a baseline file to specify basic settings, like tabs vs spaces, indent size, linefeeds, charsets, and trailing whitespace. It's supported by some editors directly, and by many others via a plugin.

All you have to do is create a file called '.editorconfig' with the settings you want and save it in the root of your project.

Package management
------------------
Select a package manager to easily pull in the dependencies needed for your projects. 
Every language benefits from standardized method for sharing code. Used to be bower was popular, but npm has sort of taken over due to its flexibility - it's a 'low-friction' way to manage packages. 
Though there are other options (notably JSPM which includes a bundler in it as well as offering package management, minification, etc) 

npm
---
Install node and npm. Do this by copying the package.json included for this course (it's located as a gist at 'bit.ly/jsdevpackagejson'. This is a list of all the packages we'll use and the npm scripts we'll set up later. 
Conveniently, VSCode includes a built-in terminal that opens up w/in the directory for the project you're working on. You could optionally use just the regular terminal on your machine as well and cd into the right directory. Once there, run 'npm install' and it will d/l and install all the packages listed. 

Package Security
----------------
So this package.json is pretty deprecated but it will do for the purposes of learning I suppose. Retire.js and Node Security Platform are two ways to check your packages for known security vulnerabilities.  
He recommends using NSP during the install part of your process (so after running 'npm install' you'd run 'nsp check' and it will check for vulnerabilities in your installed packages). This is outdated as of April 10, 2018 - as NSP was acquired by NPM. It appears it's included now in node.js v 8+. 

Setting up Dev Server
---------------------
To regularly test your work as you develop it to see what it looks like in the browser as well as making it easily reviewable by others, it makes sense to set up a dev server. 
Here are six node packages that are options he lists:

*http-server:* super simple; after installing, type 'http-server' in the directory in which you want to serve and it serves the currect directory as the web root. 

*live-server:* also simple, but includes live-reload so that things are refreshed upon save. 

*Express:* lightweight but more comprehensive, more configurable. Unlike previous two, it's not just for static files - you can serve up complex APIs via node using express. You can also use it in production and run it everywehre. (If you're makign APIs in node, this makes it an easy choice. Along the same lines, 'koa' is interesting because of its strong support of ES6 generators, and 'hapi' was created by Walmart labs and boasts a compelling configuration model. 
  Note that if you already have a server layer using another lnaguage like Ruby or Python, using any of these options is likely overkill for your dev webserver.

*budo* : works with browserify, includes hot reloading.

*webpack dev server:* built in to webpack (obviously), so avoids pulling in another dependency, also very fast to load changes because it's served from memory. ALso includes hot reloading. 

*browsersync:* Automatically sets up a dedicated IP address on your LAN so you or anyone else on your LAN can see what you're up to. All interactions remain in sync - this makes it super userful for cross- browser and -device testing. Integrates w/ webpack, browserify, gulp, and more. There are a bunch of recipes as well in its docs. 

Demo: Set Up Dev Server
-----------------------
To keep all your build related tools together it helps to make a folder to corral everything. Make a directory called 'buildScripts' in the root of your project. 
The file 'srcServer.js' will configure the web server that will serve up the files in our source directory.

Set up the srcServer.js file with some basic settings (see file with comments) and quickly make a basic index.html file in a new direcotyr at the root called 'src'. Now you can test the server by running node buildScripts/srcServer.js

Sharing Work with Others on DevServer
-------------------------------------
Browsersync doesn't share your work on a public IP - if you want to quickly share your work in progress. You don't even have to configure a cloud provider or pay for host of any kind! 
Check out the following four ways to share WIP:

*localtunnel:* Easily share work on your local machine. Exposes your localhost via a public URL by 'punching a hole in your firewall so your local machine can operate as a web server'. Setup is easy - install the package via npm globally. Then any time you want to share, start up your app, then type something like ```lt --port 3000```. That's "L" not 'I'. 

*ngrok*: Secure tunnel to your local machine. requires a bit more setup than localtunnel but not that much. THe steps are:
  1. Sign up
  2. install ingrok
  3. install authtoken
  4. start your app
  5. ./ngrok http 80 (or whatever port)
The advantage is more security through password protection. Localtunnel is not as secure as anybody with the URL can access the app. 

*now*: Quickly deploy node.js package to the cloud. Any directory that contains a package.json can be uploaded to the cloud using the command 'now' which generates a unique URL. You can apparently use it in production as well. 
  1. npm install -g now
  2. create start script that opens your preferred server such as express
  3. type 'now'
This publishes actual files to a cloud server so your machine doesn't have to be on for others to view the app (hosting persists). IF your app has a server-side component that is node based, this is a good option. 

*Surge*: only supports static files, but you can quickly host them to a public URL. You don't have to punch a hole in your firewall to let others view your work. It also allows persistent hosting so you don't have to be online for others to view the app.
  1. npm install -g surge
  2. type 'surge' and you'll be prompted the first time for an email and password. Then you'll be given a randomly generated URL and you're all done. You can even use surge as a permanent host with your own domain name. 
Thus with surge it's an easy way to do automated deployments via command line.  

Automation
----------
THe three most popular options for automating your development and  build process are : grunt, gulp, and npm scripts. 

Grunt was the first and focuses on configuration over code. It's a big chunk of json file that configures grunt to work with your plugins. It's also file-oriented in that it writes files to the disk after each step in the process. Finally it has a large ecosystem of plugins. 

Gulp is a slightly more modern task runner. It improves on grunt in that it focuses on 'in-memory streams' meaning it doesn't have to write to disk after each task - intsead you pipe the output of the previous step to the next step in memory. This makes it slightly faster than grunt. It's code based rather than config based. ALso has a large plugin ecosystem. 

Npm scripts are declared in the scripts section of your package.json file. You can leverage all the power of your OS's command line. You can also directly leverage any npm package you want. You can also call seperate Node scripts; it has convention based pre/post hooks for running other scripts before and after your script. Finally since you're using npm scripts you have access to leverage the world's largest package manager. 

npm scripts wins out because you're using the tool directly, no need for seperate plugins, simpler debugging, and better documentation, easy to learn, and simple.

Demo npm scripts
-----------------

It's popular to call sep files form teh script section of your pacakge.json file. Let's make an npm script that will start up our dev environment. By convention we'll call it 'start' so we can just type 'npm start' to get going. 

Next add a user-friendly message to help us know what's going on when we start up the dev server. 
