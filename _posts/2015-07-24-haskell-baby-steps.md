---
layout: post
title: "Haskell: Baby Steps (A Simple Web Server, Cabal, and LTS)"
date: 2015-07-24 22:43
comments: true
---

This post isn’t going to thrilling or poetic. It’s late at night and I’m trying to get to a point where I’m at least a little bit productive with Haskell. After help from a friend, experimentation, and Google searching, I think I’ve found a good way to get a simple Web server project started. I’ll quickly show the steps here.

Here are some quick notes about what I’m starting off with:

- Mac OS X (Homebrew and the developer tools are installed. I didn’t need to use them explicitly here, but the developer tools at least are probably needed by some of the steps implicitly)
- Atom Editor (IDE-Haskell plugin and its crew of buddies)

## 1) Install Haskell

I did this by first installing Stack (an alternative to `cabal-install`, which is a separate thing from “Cabal the library” or “Cabal the standard”) and then using Stack to install GHCI:

Follow the directions here for installing Stack: [https://github.com/commercialhaskell/stack/wiki/Downloads](https://github.com/commercialhaskell/stack/wiki/Downloads)

I dropped the executable into `/usr/local/bin` (I think), and then, if I remember correctly, I ran it and followed the nice directions to install GHCI.

## 2) Install ghc-mod

Atom’s IDE plugin for Haskell is really quite fantastic. It requires ghc-mod in order to run, so:

`> stack install ghc-mod`

I then had to add `~/.local/bin` to my `~/.zshrc` file and restart Atom **(from the command line)** for the ghc-mod executable to be found.

## 3) Install cabal-install

I was told by the nice people on IRC to just use `stack` to install and manage all of my dependencies, but unfortunately, Stack and GHC-Mod don’t play nicely together at the moment. And I feel like the editor plugin is waaay to helpful to pass up at this stage of my learning, so I decided to try and make Cabal work for me. This means we have to get the "cabal-install" package installed, which will offer us the `cabal` executable to work with.

`> stack install cabal-install`

## 4) Start a Project

Make a new directory, enter into it, and then

`> cabal init`

Answer the questions it asks you, and then do a few things:

Make a file with a main function in it (probably at src/Main.hs)
Make a file with a license in it, and call it LICENSE (either do this, or comment out ` — license-file: LICENCE` from your foo.cabal file, the build will fail if it looks for that file and the file doesn’t exist.
Uncomment `main-is:` in your foo.cabal file and point it at the Main file you just made. Something like this:

{% highlight yaml%}
...
executable foo
  main-is: src/Main.hs
  -- other-modules:
...
{% endhighlight %}

## 5) Use Haskell LTS

There can be some serious pain when `cabal-install` tries to install incompatible packages if left unaided. LTS Haskell has done work to calculate versions of packages that all work well together, and make those available to Cabal.

[https://www.stackage.org/lts-2.19](https://www.stackage.org/lts-2.19)

What we want to do is take a cabal.config file from LTS Haskell, and drop it in our project directory next to our foo.cabal file. This will tell `cabal-install` to limit the packages it chooses to install to only those versions which have been specified as acceptable by the cabal.config file.

You’ll probably want to pick whatever version `stack` is using globally. Take a look inside of `~/.stack/global/stack.yaml` and see what the value of ‘resolver’ is. Mine was 2.18, so I found the config file for it online. Here’s a link to the 2.19 config for your convenience:

[https://www.stackage.org/lts-2.19/cabal.config](https://www.stackage.org/lts-2.19/cabal.config)

Drop that in your project directory, and then:

`> cabal update`

5) Install Scotty

Now we want to install our Web framework. In this case, I was recommended Scotty because of its simplicity.

Open your foo.cabal file and add `scotty` without any version constraints to the list of build-depends. Here’s an example of what it might look like:

{% highlight yaml%}
...
executable foo
  main-is: src/Main.hs
  -- other-modules:
  -- other-extensions:
  build-depends:       base >=4.7 && <4.8,
                       scotty
...
{% endhighlight %}

Then, if the universe likes you as much as it liked me tonight, you should be able to

`> cabal-install`

and Scotty will be installed without an error.

## 6) Run a simple server

Drop in the minimal sample code from Scotty:

{% highlight haskell %}
# FILE: src/Main.hs

{-# LANGUAGE OverloadedStrings #-}
import Web.Scotty

main :: IO ()
main = scotty 5000 $ do
  get "/" $ do
    text "HELLO THERE, BOB?"
{% endhighlight %}

And then run it!

`> runhaskell src/Main.hs`

## 7) Extra Credit

I started looking into *Reserve* for auto-reloading my Scotty server. It's crashed on me a few
times, but other than that it seems to be working!

[https://github.com/sol/reserve](https://github.com/sol/reserve)
