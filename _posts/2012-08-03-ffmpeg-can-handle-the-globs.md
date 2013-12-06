---
layout: post
title: "FFMPEG Can Handle the Globs"
date: 2012-08-03 22:51
comments: true
categories: [tips, unix]
---
Today at work I had to make a .webm file out of a sequince of images.  
Easy, right? Just use FFMPEG! Well, at first it wasn’t so easy due to two little things:  

1. I needed to be able to convert image sequences with variable frame padding around the numbers, and I didn’t have the time, or the desire to go and write a module to find all of the numbers in one of the filenames, and replce them with %d.  

2. The sequnce did not necessarily start at zero.  
As I tested, I got more and more frustrated, wondering if there really was no possible way to pass in something as simple as `image_*.jpg` and have it just work!  

All of the forum searching and stack-overflowing I did only fueled the frustration.  
Finally, as a last resort, I turned to the ffmpeg website documentation, where I found this:  

> [When importing an image sequence, -i also supports expanding shell-like wildcard patterns (globbing) internally. To lower the chance of interfering with your actual file names and the shell’s glob expansion, you are required to activate glob meta characters by prefixing them with a single % character, like in foo-%*.jpeg, foo-%?%?%?.jpeg or foo-00%[234%]%*.jpeg.](http://ffmpeg.org/ffmpeg.html)  

So, that’s it. `image_%*.jpg`! All I had to do was add a `%` before my `*`, and it worked just fine. It recognized all of my images, even though they did not start at 0, and I didn’t have to count the number of digits in the sequence.  

Manuals can be great sometimes.