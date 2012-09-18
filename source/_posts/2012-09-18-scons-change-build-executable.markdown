---
layout: post
title: "SCONS Change Build Executable"
date: 2012-09-18 10:34
comments: true
categories: 
---

I really like the idea of [SCons](http://www.scons.org) but in practice I tend to spend much more time searching for simple answers than I do getting work done. However, I think that some day I'll understand enough that it'll save me a lot of time.  
  
I'm working with a colleague on some research right now. He's using gcc 4.7 because it supports the newer C++ standards.  
  
In order to compile  on my Mac, I had to first install gcc 4.7 through [homebrew](http://mxcl.github.com/homebrew/) using this command:  

	brew install --enable-cxx https://raw.github.com/Homebrew/homebrew-dupes/master/gcc.rb  

[Instructions found on this thread](http://apple.stackexchange.com/questions/38222/how-do-i-install-gcc-via-homebrew)  

This will install some new executables, `gcc-4.7` and `g++-4.7` being one of them.  

Now we need SCons to call 4.7 instead of Apple's default old version. Thanks to kind souls on the Stack Exchange chat, I provide this command:  

	env = Environment(CXX = 'g++-4.7')  

Whatever command we type between those quotes will be what SCons passes to the shell as the compiler executable. In my case the env=Environment() was already called with a ton of arguments. I only wanted to change the compiler command for my particular platform, so I used the following lines:  

	if platform.system() == 'Darwin':
        	env['CXX'] = 'g++-4.7'
        	print "Running on a mac"