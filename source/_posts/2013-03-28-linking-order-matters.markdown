---
layout: post
title: "Linking order matters"
date: 2013-03-28 19:08
comments: true
categories: [Bugfix, advice, howto]
---

The saga continues with building Alembic.

We deciced to switch from a windows priority build to a linux only build for the project I'm currently working on.

This meant that I had to take Alembic (which I'd finally gotten working on Mac OS X) and compile it in Ubuntu. It wasn't bad, actually. The build process was mostly painless. My excitement ramped up as I ran the first test build after installing all dependencies. To my dismay, I hit a bunch of linker errors.

It turns out I had all of the libraries linked in the wrong order. I didn't even know that linking order matters. But when building the command for the linker we want to make sure we list the libraries that we're going to link to in order from most dependent to least dependent. That's just how it goes. 

Once I got all of my libraries in the correct order, and I added in pthread (which wasn't needed on OS X, but is needed on linux) I was able to build.
