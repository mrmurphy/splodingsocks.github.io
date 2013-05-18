---
layout: post
title: "Heroku pushes from master"
date: 2013-05-18 14:22
comments: true
categories: d'oh
---

Such a small mistake can cost so many hours.

I was trying to push a rails app to Heroku recently, and I got the error `Could not find bootstrap-sass-2.3.1.1 in any of the sources`. So I changed my gemfile to point to `bootstrap-sass-2.3.1.1`, ran `bundle update` and committed.  
  
Here's the mistake.  
  
I did this on the `dev` branch, and then typed `git push heroku master` expecting that my current branch, `dev` would be pushed to Heroku and be merged with master up there. Not the way I would normally work, but I was making some quick iterations, and wanted to see the results without having to merge from dev every time. 
  
The problem is that even though I expected dev to be pushed, my unchanged master was getting pushed every time.  

According to the [Heroku docs](https://devcenter.heroku.com/articles/git) to push from the dev branch, the correct command would be: `git push heroku dev:master`

That's it!
