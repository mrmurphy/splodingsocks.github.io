---
layout: post
title: "Image Magick"
date: 2012-08-08 14:41
comments: true
categories: [tips]
---
Today I made an animated GIF as a UI element for a tool I’m working on.  
I really dislike crummy looking images, so I fiddled with ImageMagick until I found that the folling command  would build a satisfactory GIF:  

`convert -loop 0 -quality 100 -delay 1 +dither -enhance *.jpg foo.gif`

The `+dither` will turn off dithering, this brings you a lot closer to your original image quality.  
I tried to find out how to set the frame rate as well, and the docs page says that the `-delay` option can be input in the following fashion: ticks/ticks-per-second. Idealy, this would allow me to set the frame rate to 60 FPS by entering the value: 1x60. However, experimentation yielded no different results than the default values.  