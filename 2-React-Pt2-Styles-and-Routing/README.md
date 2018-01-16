Brief Intro to Routing and Styling in a React app
=

Let's first take a look at what we are dealing with

**Problem**
We need to go to more than one page in an application / web app

There's two ways we can solve this problem
1 - Do things the traditional way and each link will do a server request for a new html page with all of it's resources
2 - We can load the whole app within a single html page with the javascript / react doing the heavy lifting

There's pros and cons to both solutions.

If we choose 1 we don't have to worry about bundling huge react applications increasing load time and general responsiveness.
The con however is naviagation between pages are quite slow, and reloading a lot of shared content.

Now if we choose option 2 we don't have to worry about load time between pages since everything is on the page and react rendering is much faster then server requests and loading a whole new DOM. At the same time we can easily grow our app to become monolithic and slow.

In reality we usually do a mixture of the two, so once a react / whatever app is starting to get large and slow it may be time to break it up into multiple applications. Larger codebases are also much harder to maintain and test. 
