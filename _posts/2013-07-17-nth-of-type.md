---
layout: post
title: "nth-of-type woes."
date: 2013-07-17 12:47
comments: true
categories: css, what?
---

#What on earth, CSS?
Css can be a real bummer. But learning the specific rules helps.
Here's a little trick to help with the nth-of-type selector:

Say you have markup that looks something like this (haml)

```
.wrapper
    .bob
    .entry
        one
    .entry
        two
    .entry
        three
```

It makes sense to me that: `div.entry:nth-of-type(1)` would select the div that says "one". In reality, it won't select anything, since .bob is the first child of .wapper (the parent of all of the divs). I won't rehash the rules here, [since Chris Coyier did such a smashing job with his blog post.](http://css-tricks.com/the-difference-between-nth-child-and-nth-of-type).

A trick to help this work in a more expected way is to wrap those `.entry`s into their own parent:

```
.wrapper
    .bob
    .entries
        .entry
            one
        .entry
            two
        .entry
            three
```

And then the div with "one" will be selected.
