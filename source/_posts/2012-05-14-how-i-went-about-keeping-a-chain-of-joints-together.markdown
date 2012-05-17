---
layout: post
title: "How I went about keeping a chain of joints together."
date: 2012-05-14 10:22
comments: true
categories: [Homework]
---

As a class assignment, I needed to program my own implementation of an inverse kinematics solver.  
In case you don't know what on earth that is, watch this:  

<iframe width="640" height="480" src="http://www.youtube.com/embed/euFe1S0OltQ" frameborder="0" allowfullscreen></iframe>

We were given the freedom to choose what tools we wanted to use in completing the assignment, and I chose to use my favorite open source package, Blender. (Plus, the added bonus that I got to use Python to program, instead of C#. My brain plays well with python.)  

In blender, it is easy to set up a parent / child relationship between objects. Whatever transform happens to the parent gets inherited by the child. I didn't use that built-in system, however, because many of the students in the class were using a framework that included no such function. I wanted the practice of doing it myself.  

I had to do a little bit of trigonometry, and a little bit of recursion. In the end, however, the solution is pretty simple. We just need to follow a couple of rules:  

* When a parent is rotated, the child receives the same rotation amount, applied in its own object space, that the parent does. (If I rotate the parent 20 degrees about the z axis, the child will also have those 20 degrees added to whatever its current rotation is.)
* The same rule applies to translation, and to scale. (I only implemented rotation and translation this time. I've heard it said that the first great virtue of every programmer is laziness.)
* If the child has children, each of these transforms must be propagated down the line.  

**Here's the tricky part:**

* If a parent is rotated, both the translation and rotation of its child must be updated, as the child needs to stay attached to the end of the parent.

**Quick note**: I'm sorry I don't have any pretty pictures to make this easy to understand. Let's just call it an exercise in imagination and mental imaging. Also, just to clarify, I'm not going to explain how to set up the whole solver. This post is only explains how I did the parent-child relationship of joints.  

## Solving the tricky part:
Let's take a scenario, and break it down.
#### Scenario:
Rotate the root of a three bone chain some positive angle about the Z axis.
#### Steps:

1. Rotate the root bone, just like we want.
2. Use trigonometry to figure out the world coordinates of the end of the bone, where its child will sit:

``` python Pseudocode for finding endpoint.
X = WorldPositionOfRootBone + Length * cos(rotation)  
Y = WorldPositionOfRootBone + Length * sin(rotation)
```
3. Move the child bone to that world location.
4. Apply the same rotation to the child bone that was applied to the root bone.

#### Here's where it gets interesting:
*Note, the code you will see is Python 3, written for the Blender Game Engine using the Blender API. It's not intended to be a complete example.*  

Recursion can be either miraculous, or mind-busting. I often find it to be a little of both. We are going to use recursion in this circumstance, to make sure that all bones in the chain get updated correctly.  

In my implementation I made a new class for a joint, and I had each joint hold a pointer to its child. A little like this:  

``` python
class Joint(object):
    def __init__(self, obj, child=None, length=10):
        self.o = obj
        self.child = child
        self.length = length
```

When the rotation method is called on the root bone, it goes through the process described above, but before end of the method for movement / orientation in a joint, a call is made to update the movement / orientation on its child, if any child exists. Like this: 

``` python
    def rotateRelative(self, rot):
        self.o.applyRotation([0, 0, rot])
        self.updateChildren(rot)
```
And this is what the `self.updateChildren()` method looks like:

``` python
def updateChildren(self, rot=0):
        if(self.child):
            self.updateChildRot(rot)
            self.updateChildPos()
```

This way, and time a bone is moved, it makes sure to move all of its children before finishing. 
Here's a little video of how my robot arm turned out:

<iframe width="640" height="360" src="http://www.youtube.com/embed/MxWtpxjix-8" frameborder="0" allowfullscreen></iframe>