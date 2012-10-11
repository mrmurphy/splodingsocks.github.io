---
layout: post
title: "Boost.Python, SCons, and the Mac“
date: 2012-10-11 12:35
comments: true
categories: howto, documentation
---
I’ve mentioned before that I’m helping a colleague with the vizualizations for his master’s thesis. He’s in love with C++, and has written his whole implementation that way. I, however, am in love with Python. Plus, I’m going to be doing some integration with Maya, and would much rather use the Maya python api than the C++ API.  

This is where Boost.Python comes in. [Boost](http://www.boost.org/) is a great collection of libraries for extending the functionality and convenience of C++. Boost.Python is a convenient wrapper to Python’s C API. This makes it comparatively easy to expose a python API to existing C++ code. And that’s just what I’m trying to do.

This little article documents the few things I had to get straight in   my mind for this situation to work on my custom project. building with SCons, on a Mac. It’s not a guide to using Boost.Python. 

## Build boost.
First, you’ll need to build the boost libraries for your system and make sure that they are located in a place where you can link to them. Not all boost libraries need to be compiled, but Boost.Python does. 

## Get your SConstruct right!
It took me quite a bit of experimenting and searching to get the correct configuration in my SConstruct file. Here’s the working copy: 

	libs = Split("boost_python")
	libpath = Split("lib/x86_64-mac")
	includes = Split("include /usr/include/python2.7 ")
	frameworks = Split("Python")
	
	env = Environment(
    	              CPPPATH = includes,
        	          LIBS = libs,
            	      LIBPATH = libpath,
                	  FRAMEWORKS = frameworks,
                	  SHLIBPREFIX = '',
                	  SHLIBSUFFIX = '.so'
                  	)

	env.SharedLibrary('hello_ext', 'hello.cpp')
	
`libs` (in line 1) stores the string that will tell SCons we are going to be looking for the boost_python compiled library when linking.  
`libpath` is the path to those libraries.
`includes` Boost.Python will need access to `pyconfig.h` and other python C++ headers, which are located where your python install includes are. If you don’t include this directory, your build will break!  
`frameworks = “Python”` Since we’re on a mac, we need to tell SCons to include the Python system framework while compiling.  

Now let me draw your attention to the line `SHLIBSUFFIX=‘.so’. Python, when importing, expects either a .py file, or a .so file. The default mac extension for a shared library is `.dylib`. With this variable we are telling SCons to use the .so suffix instead of the default.

Lastly, we use `env.SharedLibrary` to build the shared object file. It’s important that the name of the shared library be the same as the module name you told Boost.Python to give your module in the C++ file.

That’s it! You should be able to properly build now.
If you have any questions, feel free to leave a comment.
