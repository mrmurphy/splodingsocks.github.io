--- 
layout: post
title: Google Voice texting tool.
tags: [text, sms, google voice, python, api]
status: publish
type: post
published: true
categories: [Little Projects]
comments: true
---
My wife and I sometime volunteer to be leaders for the new students at our university. Since we need to contact 30 students at a time, and they all have cell phones, texting is the way to go.  The problem is that it seems like most cell phone carriers (including google voice) don't allow sending an SMS to more than about five people at once (to reduce spam?). Here's the script I wrote to get around that:
<h2>Google Voice, a marvelous tool:</h2>
If you haven't checked out <a href="http://voice.google.com">Google Voice</a> yet, I highly recommend doing so. Google Voice provides Free SMS plus a number of other features. I use SMS most regularly though. I love the ease with which I can view and compose text messages right from the browser. It does require that you sign up for a new free number. I did that a year ago, and I just give people my google number now, which forwards to my cell number.

Google voice in the browser will not let you send an SMS to more than five people at once, so here's where I had to turn to:
<h2>pygooglevoice</h2>
<a href="http://code.google.com/p/pygooglevoice/">pygooglevoice</a> is a python API for google voice. This means that I can use the functions that GV offers without having to use their interface. It means that I can use them from a script, which is MUCH more convenient for mass operations.

To install it on mac os X, i just opened the terminal and run this command:
<pre class="syntax {bash}">sudo easy_install -U pygooglevoice</pre>
&nbsp;

<a href="http://snipt.net/murphyspublic/send-sms-using-google-voice/">and then I wrote this little script to be able to send texts to a list of people. The cool thing is that if you type "NAME" in all caps in the body of the text, it will be replaced by the name of the person who is being texted.</a>

&nbsp;
