//Steps to setup Heroku
/*
- Goto Heroku and download CLI tools 
- which heroku shows you have it 
- heroku create nameOfApp 
- this gives back two urls
- first URL - is the public facing url for our app 
- second URL - is a git repo on heroku 
- it has already set up a remote for us in our drectory - check via git remote 
- then push our existing repo by git push heroku master 
- our public/bundle is in gitignore so even upon pushing we won't see any changes live to the public url 
- just type deploy heroku - and that will run a function under the hood that would unignore public/bndle and run the webpack 
  to make sure we have the latest bundle - **this is better than removing the public/bundle from our .gitignroe because 
  then we would have to remember everytime we make a change and push it up to actually run webpack that's all 
  - deploy heroku does that for us **
- Then we have to link up our db 
- heroku logs - shows you the logs of your server 
- on heroku we choose the hobby-dev package and add that to our personal apps 

configuring our secrets file --- 
- heroku config --help => intructionf for setting up env variables for our app 
- you can set up en variables by doing something like --- heroku config:set key=value 

continuous deployment 
**codeship.com**
for continuous testing and deployment 

*/