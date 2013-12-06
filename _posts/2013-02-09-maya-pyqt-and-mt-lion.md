---
layout: post
title: "Maya, PyQt and Mt Lion"
date: 2013-02-09 23:30
comments: true
categories: [howto, bugfix]
---

It turns out that to run PyQt from within Maya you need to build a custom version of QT, and then build PyQt on top of that. This is kind of a pain, but thanks to [JustinFX](http://www.justinfx.com/) and his build scripts, called MyQt4, the pain of doing this on a Mac is soothed:

[https://github.com/justinfx/MyQt4](https://github.com/justinfx/MyQt4)

If you're running 10.7, or 10.6, your life is really easy. Just download some of the pre-built packages that he has provided. If you're running 10.8, you've got to do a little fiddling to get this to work.

The new XCode 4.5+ on Mountain Lion has gotten rid of the `/Developer` folder that used to exist. The build script for MyQt4 expects to be running on 10.7, so it tries to use files from that directory. You can modify the MakeFile if you want, but I chose to create a symlink from `/Developer` to the new location: `/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer` so that I wouldn't have to keep modifying paths in the future.

You can do that like this:

```
sudo ln -s /Developer /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer
```

Then just `cd` to `/` and `ls -la` to make sure you have a new symlink pointing to the correct location.

The second thing we have to do is download the SDK for OS X 10.6. They are removed from OS X 10.8 but QT only supports building on 10.6 :frown:. I found someone who was kind enough to host a zipped archive of the files here: [http://www.jamesgeorge.org/uploads/MacOSX10.6.sdk.zip](http://www.jamesgeorge.org/uploads/MacOSX10.6.sdk.zip)

Download them, unarchive them, and put them into /Developer.

Now, when you try to build MyQt4, it should work fine!

The last step, building a package, will fail because the methods of package building have also changed in 10.8, but don't worry. It should install the appropriate files anyway.

Good luck!
