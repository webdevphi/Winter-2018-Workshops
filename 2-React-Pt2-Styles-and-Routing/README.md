Brief Intro to Routing and Styling in a React app
=

Let's first take a look at why front end routing is

**Problem**

We need to go to more than one page in an application / web app

**Solution(s)**

There's two ways we can solve this problem
1 - Do things the traditional way and each link will do a server request for a new html page with all of it's resources
2 - We can load the whole app within a single html page with the javascript / react doing the heavy lifting

There's pros and cons to both solutions.

If we choose 1 we don't have to worry about bundling huge react applications increasing load time and general responsiveness.
The con however is naviagation between pages are quite slow, and reloading a lot of shared content.

Now if we choose option 2 we don't have to worry about load time between pages since everything is on the page and react rendering is much faster then server requests and loading a whole new DOM. At the same time we can easily grow our app to become monolithic and slow.

In reality we usually do a mixture of the two, so once a react / whatever app is starting to get large and slow it may be time to break it up into multiple applications. Larger codebases are also much harder to maintain and test. 

**Definitions**

React-Router is a 3rd party library for front end routing in React.
So what is front end routing? 
It's actually pretty simple it just means when you click on a link (`<a />`) instead of doing an actual http request we'll just render a react component accordingly.

For this we can't use the standard html `a` tag since it will do an http request by default. To make things easy for us, thankfully `react-router` comes with a `Link` component with a `to` property to set the location which will be looked up in the front end router instead of server side. 

Hopefully you are convinced client side routing is a good thing, let's get started.

**Getting started**

To make things easy, take the project from `1-React` and we'll just delete everything in `src/` and install react router

*Install*

we'll just need `react-router-dom` on top of what we already have, so just run `npm install --save react-router-dom`

*First Look*

To get started let's make a bare minimum index.jsx

```jsx
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

const App = props => (
  <div>
    Hello!
  </div>
)

render(<Router> <App /> </Router>, document.getElementById('app'))
```

To use react-router we must use the `<Router>` component on the top level. This sets up a browser history and allows us to use `Route` and `Link` tags inside the `App` component.

Lets add some routes!!

