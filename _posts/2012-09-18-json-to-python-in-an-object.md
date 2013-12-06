---
layout: post
title: "JSON to Python in an Object!"
date: 2012-09-18 10:36
comments: true
categories: 
---
In order to get our object-oriented data back and forth between C++ and Python, my colleague and I decided to read / write JSON formatted text files.  

 I'm a little picky when it comes to syntax and clarity. Python dictionaries, although well made, aren't my favorite thing to use due to the extra brackets and characters needed to access their members.  

I wanted an easy want to turn my JSON file into a python object with `.` accessible attributes.  

With the help from (this question on SO)[http://stackoverflow.com/questions/3031219/python-recursively-access-dict-via-attributes-as-well-as-index-access] I customized this solution:

<script src="https://gist.github.com/3743805.js"> </script>  

The idea is that a JSON file from disk can be passed in to the constructer, and a new object will created with the members accessible  like this: `foo.bar` instead of like this: `foo['bar']`. If you find this useful, or you have a suggestion, leave a comment!