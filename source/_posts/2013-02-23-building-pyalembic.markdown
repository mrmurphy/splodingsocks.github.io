---
layout: post
title: "Building PyAlembic"
date: 2013-02-23 23:09
comments: true
categories: 
---

This is going to be a messy one.

I wrote some of the code for my colleague's thesis using the Alembic IO libraries from [Imageworks](http://alembic.io/). Trying to build on Windows was a nightmare for me. I don't understand the Windows world almost at all. You can imagine how relieved I was to find [Christoph Gohlke's unofficial builds](http://www.lfd.uci.edu/~gohlke/pythonlibs/) where I was able to download an executable installer for Windows 7, and I was set to go right away.

However, those are the libraries for PyAlembic, and I had written the code for the thesis in C++. Why did I do this? Precisely because I had previously failed to build the pyalembic libraries on the mac. But there I was, back to the challenge. 

I'm pleased to say that I succeeded, but only after stumbling my way through a lot of confusion. I've taken notes on what I did to get it built, so I'll note them down here.

# Preamble
I'm running on OS X 10.8.2, and I love [brew](http://mxcl.github.com/homebrew/), so I used that to install a new version of Python. By the way, I didn't learn this until recently, brew can install Python as a linuxy, non-framework setup, or as a macish framework. It says it all here [on the python guide](http://docs.python-guide.org/en/latest/starting/install/osx/). 

Follow that guide to install python as a framework using brew.

I'm using zsh here. The commands that I write will be slightly different from bash and csh syntax. I've adapted them to work well with zsh. 

If you haven't learned the joys of zsh, I suggest you do.
I also suggest you check out [yadr](https://github.com/skwp/dotfiles)

# 1. Build Boost
I chose to use Boost 1.44 because that's the minimum required version from the Alembic source readme.

Download the source, `cd` into the directory, and run these commands with me :

    export CXXFLAGS="-fPIC"
    export CFLAGS="-fPIC"
    export LDFLAGS="-fPIC"
    umask 022
    ./bootstrap.sh --with-libraries=program_options --with-libraries=thread --with-libraries=python
    # Change to not include the compiler name somehow?
    sudo ./bjam install --layout=versioned link=static threading=multi cxxflags=-fPIC
    cd /usr/local/include/boost-1_44
    sudo chmod -R a+r .

Okay, there's something extra here that I don't understand very well. For me, the compiled libraries had something that looked like the compiler name tacked on to the library name. That made it impossible for CMake (which we'll use later) to auto-locate the Boost libraries. So go ahead and find the three files we built. They will look something like this: 

    libboost_foo-mt-****-1_44.a

Get rid of whatever those stars represent. In the end, all three of your libraries should look like this:

    libboost_foo-mt-1_44.a

Where `foo` is the name of the library (python, thread, etc...) and 1_44 is the version of Boost that you've built.

next:

    popd
    cd ../

to get back to the parent directory of the boost source and it's time for...

#Numpy

This is how I got numpy to work:

    git clone https://github.com/numpy/numpy.git
    cd numpy
    python setup.py build
    python setup.py install

Pretty straightforward.

#ILMBase
I didn't have a problem building ILMBase. I hope you don't either. I'm leaving it out of this guide, but it's very important that you build it before moving on.

#HDF5 
Same thing with HDF5. I think I installed it with Homebrew.

#Other dependencies? 
I didn't have a problem finding or building the other dependencies. Make sure you look them up in the README and that you have them installed.

#pyilmbase
Here's where we do some more magic. Download and extract pyilmbase [from the web site](http://www.openexr.com/downloads.html).

    # Build pyilmbase (I've already extracted it)
    cd pyilmbase-1.0.0 #Or whatever version you've downloaded.
    export CPPFLAGS="-I/usr/local/lib/python2.7/site-packages/numpy/core/include/"
    ./configure --with-boost-include-dir=/usr/local/include/boost-1_44/ --with-boost-lib-dir=/usr/local/lib --with-boost-python-libname=boost_python-mt-1_44
    make
    make install

Okay, if that has worked, now we can move on to the heavy hitter...

#Alembic and pyalembic

    # Build Alembic:
    curl http://alembic.googlecode.com/files/Alembic_1.1.3_2013021100.tgz > Alembic.tgz
    tar -xvf Alembic.tgz

Change into the extracted alembic source dir.

If you want to, you can rebuilt your `locate` database before bootstrapping, but since we'll be feeding almost everything in by hand on the command line, I wouldn't worry about it. I've included the command to do so here for future reference, however.

    # Rebuild the `locate` library used for finding headers, etc...
    # sudo /usr/libexec/locate.updatedb

K, here's where it got a little hairy.
I had to edit `Python/PyAlembic/CMakeLists.txt` to reflect the structure of the python installation on my disk.

I will leave that up to you, as it's a little more detailed than I want to write currently. I found the CMake GUI tool useful at this point, as I could try and run the configuration repeatedly, and fix whatever was failing as I went along. 

If you don't change the CMakeLists file, you'll likely run into a "python libraries not found" CMake configuration error.

If you can't figure this out, leave a comment below and I'll be happy to try and help.

Once you've got the correct paths to python set up in the cmake file, we have to do one more thing.

For some reason, the cmake files in this project use the cmake variable `BOOST_PYTHON_LIBRARY` but my build wasn't happy until I did a search and replace through the whole source project, changing it to: `Boost_PYTHON_LIBRARY`. I did that using the wonderful search and replace feature of Sublime Text 2.

Now, we should be able to run the bootstrap command:

    python build/bootstrap/alembic_bootstrap.py \
    --dependency-install-root=/usr/local/ \
    --hdf5_include_dir=/usr/local/include/ \
    --hdf5_hdf5_library=/usr/local/lib/libhdf5.a \
    --ilmbase_include_dir=/usr/local/include/OpenEXR/ \
    --ilmbase_imath_library=/usr/local/lib/libImath.a \
    --pyilmbase_include_dir=/usr/local/include/OpenEXR/ \
    --pyilmbase_pyimath_library=/usr/local/lib/libPyImath.1.0.0.dylib \
    --pyilmbase_pyimath_module=/usr/local/lib/python2.7/site-packages/imathmodule.so \
    --boost_include_dir=/usr/local/include/boost-1_44/ \
    --boost_thread_library=/usr/local/lib/libboost_thread-mt-1_44.a \
    --boost_python_library=/usr/local/lib/libboost_python-mt-1_44.a \
    --zlib_include_dir=/usr/include/ \
    --zlib_library=/usr/lib/libz.1.2.5.dylib \
    --enable-pyalembic \
    ../alembic_build

Look at all of those nasty parameters. You may have to adapt some of those paths to your fit your system layout.

Now:

    cd ../alembic_build        #go to the build directory
    make -j8                   #to build with eight cores. Adjust this number accordingly.
    make install               #this will build the alembic libraries.
    cd python
    make
    make install

At this point, I had to `cd` to `/usr/local/alembic-1.1.3/lib/` and there I found two libraries: alembicglmodule.dylib, and alembicmodule.dylib

I don't know why these came out as `dylib`s instead of `so`s. So just copy them to your python `site-packages` folder, and rename them with the extension `.so` instead of `.dylib`

Then, pop open python and 

    import imath
    import alembic

It's important to note that you may always have to import imath BEFORE importing alembic. When I didn't, I got the error:

    TypeError: No Python class registered for C++ class PyImath::FixedArray<unsigned char>

[See my post on the alembic group for more info](https://groups.google.com/forum/?fromgroups=#!topic/alembic-discussion/iqo1MKE4kyc)

That's the distilled version of what I did over the past week or so to get this built. 

Whew.

