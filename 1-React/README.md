React is a `fun` front end library for creating `fun` web apps!
--
**"I don't care just let me run it"**
- clone this repo
- `cd 1-React && npm install`
- if webpack isn't installed then `npm install --global webpack`
- `webpack`
- open index.html

**Initial setup**

First let's go through some tools / terms and what they do / mean!

*Node*
- JavaScript Runtime
- Think of it as a way to run javascript without a browser

*Npm*
- Package manager for Node / JavaScript ( / more )

*package.json*
- Project Description
- Dependencies, git repo, author, etc.

*ECMAScript*
- Standardized Specification for JavaScript
- Could say JavaScript is an implementation of ECMAScript

*Webpack*
- Bundler
- Takes all your dependencies and bundles it into a single js file to avoid making lots of server requests

*Babel*
- Transpiler
- Transpiles your new es201X code into older versions of javascript to support older browsers like Internet Explorer
- Support for non tranditional JavaScript features like annotations and JSX - we care about JSX

*JSX*
- HTML templating superset of JavaScript
- Write HTMl in JavaScript files with the ability to inject JavaScript into HTML!

1 - First thing make sure you have node installed.
https://nodejs.org/en/download/ (8 or 9 are fine, doesn't matter for this workshop)

  - to make very node / npm is installed correctly on your computer try to run `node -v` and `npm -v` in a cmd prompt / terminal.

2 - Make a folder called `intro-to-react` and initialize a package.json

Open a terminal and run the command ```npm init``` inside the folder `intro-to-react`
it'll ask you a bunch of questions, like git repo, name etc, fill in what you can, but we'll leave most of it blank for now.

3 - install everything!!!

we need to install babel, react, webpack, and all their dependencies..

we use `npm install <package>` to install things but it's nice to do `npm install --save <package>` since it'll show up in the package.json so even if you delete `node_modules` you can get them back easily

`npm install --save webpack react react-dom babel-core babel-loader babel-preset-es2015 babel-preset-react`

check on your `package.json` you should see a bunch of things the `dependencies` object. Also you'll notice a `package-lock.json` file, this is a more accurate (and more complex) mapping of your dependencies, thankfully we never have to directly work in it.

Now that we have everything installed, we need to do a bit of inital config

*Babel*

Create a `.babelrc` file and put the following in there
```json
{
  "presets" : ["es2015", "react"]
}
```
This is a simple one, all we are saying here is we want babel to translate our code from es2015 Spec and the React (JSX) code to regular es5 code. 
.. Yes the version names of ECMAScript (es) / JavaScript are awful and really confusing but all we have to understand is that ES5 is the version of ECMAScript that runs in most browsers.

*Webpack*

create a `webpack.config.js` file and put the following in there

```javascript
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build/');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  }
};

module.exports = config;
```
This one is a bit more involved but bear with me!
- first two lines are javascript import import statements
- making the DIR variables just makes it easier below. `__dirname` is a global string variable of your current directory and we'll just say that the bundled file will be in the `build/` folder and our app will live under `src/`
- next in the config we show the entry (main) javascript file - we'll get to the jsx in a bit
- we also have what are called loaders, which are intermediate steps that get thrown into the bundling process, so we are adding a step to transpile our `jsx` code in to plain javascript.

Great! Now the inital setup is out of the way let's make our first hello world in react!

**Hello World**

There are a few things missing that we brushed over
- Since this is a website we need a html file
- The actual react code

1 - `index.html`
```html
<html>
  <head>
    <title>
      Phi Intro to React!
    </title>
  </head>

  <body>
    <div id="app"></div>
    <script src="build/bundle.js"></script>
  </body>
</html>
```
We have two important things here
- The div which our app will load into
- The script is loaded after the div so in the javascript we can find the `#app` element

2 - `src/index.jsx`
```JSX
import React from 'react'
import { render } from 'react-dom'

class App extends React.Component {
  render() {
    return (
      <div>
        Hello World
      </div>
    );
  }
}

render(<App />, document.getElementById('app'))
```
Our app lives inside this `App` React Component.
- We know something is a component if it extends `React.Component`
- Components have a few important properties but right now all we care about is the render method will returns some JSX which eventually gets turned into HTML
- We only have to call the main render (the last line of code) once for the entire app, this is also part of the JSX magic is that if a class extends `React.Component` we can instantiate it by calling `<{ClassName} />`
- We also need to pass in the html element we will load the app into, in our case it'll be be the `#app` div from index.html

*Run it!!*

to compile everything you just have to run `webpack` in the root folder - if this doesn't work try to install webpack globally (`npm install --global webpack`)

Now if you open index.html in a browser you should see "Hello World"!!

**React Basics**

Ok now lets get into React and understand it a bit more. 
Let's change a few things from the above index.jsx, we want to be able to a) add variables into the template b) change thing dynamically.

First, variables.

React has 2 main ways we can (should) inject variables into templates
1 - Props
2 - State

First we'll see how Props work..

*Props*

In our above example we are missing one of the key parts of a class, the constructor! Of course we don't need it, but classes aren't too much fun without them, lets update our class to add one.
```JSX
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>Hello {this.props.name}</div>
    )
  }
}

render(<App name="Marcel" />, document.getElementById('app')
```
- we can inject code into the jsx templates with `{` `}` we can put any javascript in there that will evaluate to a value.

Now if you rebuild your code with `webpack` you should see "Hello Marcel" or whatever your name is :)
So as you can tell props are static variables that come through the parent component or in this case, the render function call. They are useful for when you know something won't change over time, or very little. Every parameter you pass into the `App` component get's mapped to a property on `this.props`.
Neat!

*State*

This is all good and fun but not very interactive. Lets add a text field so we can automatically update the person / thing we are greeting.

first lets define a state object

```JSX
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otherName: ''
    };
  }
  
  //...
}
```
we'll call the other name `otherName` since javascript has a very loose and dynamic type system we define the state in the constructor with default values mainly for readability to know what type each property is.

Now to actually `change the state`

```JSX
...
class App extends React.Component {
  //...
  
  handleKeyPress(event) {
    const text = event.target.value;
    this.setState({
      text: text
    });
  }

  render() {
    return (
      <div>
        <div>{this.props.name} says "Hello" to {this.state.otherName}!</div>
        <textarea onKeyPress={this.handleKeyPress.bind(this)} />
      </div>
    )
  }
}
```
If you are familiar with javascript and html this won't look too crazy except you'll probably "wondering why the `.bind(this)`".. Well it's a bit complicated but basically handleKeyPress function get's called in a different context from this class (I know crazy right?) so we need to bind it's `this` variable to our current object'.
- It's ok if you don't get that right now, just know when you use `this` in a function and you pass it as an event handler, you'll need to bind `this`
- It's worth mentioning we can only return one HTML element in the render function, so usually we just wrap everything in a div, cause why not..

*Rebuild!!*

Write things in that text field and you should see the text updating.

