React is a `fun` front-end library for creating `fun` web apps!
--
**"I don't care just let me run it"**
- clone this repo
- `cd 1-React && npm install`
- if webpack isn't installed then `npm install --global webpack`
- `webpack`
- open index.html

**Initial setup**

First, let's go through some tools/terms and what they do/mean!

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
- JavaScript is an implementation of ECMAScript

*Webpack*
- Bundler
- Takes all your dependencies and bundles it into a single js file to avoid making lots of server requests

*Babel*
- Transpiler
- Transpiles your new es201X code into older versions of javascript to support older browsers like Internet Explorer
- Support for non-traditional JavaScript features like annotations and JSX - we care about JSX

*JSX*
- HTML templating superset of JavaScript
- Write HTML in JavaScript files with the ability to inject JavaScript into HTML!

1 - First thing make sure you have node installed.
https://nodejs.org/en/download/ (8 or 9 are fine, doesn't matter for this workshop)

  - to make sure node / npm is installed correctly on your computer try to run `node -v` and `npm -v` in a cmd prompt/terminal.

2 - Make a folder called `intro-to-react` and initialize a package.json

Open a terminal and run the command ```npm init``` inside the folder `intro-to-react`
it'll ask you a bunch of questions, like git repo, name etc, fill in what you can, but we'll leave most of it blank for now.

3 - install everything!!!

we need to install babel, react, webpack, and all their dependencies..

we use `npm install <package>` to install things but it's nice to do `npm install --save <package>` since it'll show up in the package.json so even if you delete `node_modules` you can get them back easily

`npm install --save webpack react react-dom babel-core babel-loader babel-preset-es2015 babel-preset-react`

check your `package.json` you should see a bunch of things in the `dependencies` object. Also, you'll notice a `package-lock.json` file, this is a more accurate (and more complex) mapping of your dependencies, thankfully we never have to directly work in it.

Now that we have everything installed, we need to do a bit of initial config

*Babel*

Create a `.babelrc` file and put the following in there
```json
{
  "presets" : ["es2015", "react"]
}
```
All we are saying here is we want babel to translate our code from es2015 Spec and the React (JSX) code to regular es5 code
.. Yes, the version names of ECMAScript (es) / JavaScript are awful and confusing but all we have to understand is that ES5 is the version of ECMAScript that runs in most browsers

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
This one is a bit more involved
- first two lines are javascript import statements
- making the DIR variables just makes it easier below. `__dirname` is a global string variable of your current directory and we'll just say that the bundled file will be in the `build/` folder and our app will live under `src/`
- next, in the config, we show the entry (main) javascript / jsx file 
- we also have what are called loaders, which are intermediate steps that get thrown into the bundling process, so we are adding a `babel` step to transpile our `jsx` code into plain javascript.

Great! Now the initial setup is out of the way, let's make our first hello world in react!

**Hello World**

There's 2 files we need an HTML file and a react (jsx) file

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
import React from 'react';
import { render } from 'react-dom';

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
- Something is a component if it extends `React.Component`
- Components have a few important properties but right now all we care about is the render method that returns some JSX which eventually gets turned into HTML
- We only have to call the main render (the last line of code) once for the entire app. Note the `<App />` syntax here, this is JSX syntax to instantiate the react class component.
- We also need to pass in the HTML element we will load the app into, in our case, it'll be the `#app` div from index.html

*Run it!!*

to compile everything you just have to run `webpack` in the root folder - if this doesn't work try to install webpack globally (`npm install --global webpack`)

Now if you open index.html in a browser you should see "Hello World"!!

**React Basics**

Ok now let's get into React and understand it a bit more. 
Let's change a few things from the above index.jsx, we want to be able to 
a) add variables to the template 
b) change thing dynamically

First, variables.

React has 2 main ways we can (should) inject variables into templates
1 - Props
2 - State

**Props**

In our above example, we are missing one of the key parts of a class, the constructor! Of course, we don't need it, but classes aren't too much fun without them, let's update our class to add one
```JSX
//...
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>Hello {this.props.name}</div>
    );
  }
}

render(<App name="Marcel" />, document.getElementById('app')
```
- The super call within the constructor is mandatory as it maps the given props to `this.props` 
- We can inject JavaScript code into the jsx templates with `{` `}`

**State**

This is all good and fun but not very interactive. Let's add a text field so we can automatically update the person/thing we are greeting.

first let's define a state object

```JSX
//...
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otherName: ''
    };
  }
  
  //...
}
//...
```
- we store app variables in the `state` property of the class
- you will set the default state in the constructor, if it doesn't have a real default value just pass in the default value for that type, for our example it'll be the empty string

Now to actually `change the state`

```JSX
//...
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
        <input type="text" onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}
//...
```
We're introducing an important concept here - passing functions to other functions
- We have an event handler function `handleKeyPress` which we pass to the input element's `onChange` property
- The way we change state in react is not by directly setting the state property - this is very important as setState is an async function that will trigger the component to update the view

***
*this rebinding*

You'll notice we aren't just passing in the function normally to onChange, we also did a `bind(this)`.
The bind method will take a function and rebind it's `this` variable to the value you pass in and return that function.
This is important since we are passing the function to an element's onChange property which when called will not be in the context of the `App` class object so if we did not call `bind` it wouldn't have access to `this.state` or `this.props`.
This is not trivial and you'll most likely need to see some more examples to get used to it, just know you have to do it when passing an internal function with use of `this` to an external function.
***

- It's worth mentioning we can only return one HTML element in the render function, so usually, we just wrap everything in a div

**Child Components**

So far we've only seen a single Component so let's see how we create child components

Let's change our app to instead of updating what a single text field says from "{someone} says hello" to create a list of people who have said hello

We'll introduce the concept of stateless function components, as the name suggests it's a component that doesn't have the `state` property and because of that we can represent the component by purely it's render function

We'll have a simple example which will be a sort of alias for the `<li>` HTML element

`src/child.jsx`
```JSX
import React from 'react';

const Child = props =>
  <li>
    {props.text}
  </li>

export default Child;
```

- We still need to import react since the jsx gets transpiled to a bunch of `React.createElement()` calls
- Here I am using Arrow function notation just because it looks pretty... but it is also concise and common in documentation
- The last thing we will do is export the `Child` function as default

Let's update the render in the index.jsx to make it easier to add components

`src/index.jsx`
```JSX
//...
class App extends React.Component {
  //...
  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange.bind(this)} />
        <button onClick={this.addChild.bind(this)} >
          Add a child
        </button>
      </div>
    )
  }
}
//...
```
We got rid of most of the old render, we'll keep the input and a button which will trigger creating a new `Child` component somehow...
- We'll have to store the child text somewhere so first let's add a property to the state, we'll get to the `this.addChild` soon

```JSX
//...
class App extends React.Component {
  constructor() {
    this.state = {
      text: '',
      childrenText: []
    };
  }
  //...
}
//...
```

- we'll use an array to store the text each child holds

now to implement `addChild`

```JSX
//...
class App extends React.Component {
  //...
  addChild() {
    const newChild = `${this.state.text} said Hello!`;
    this.setState({
      childrenText: [...this.state.childrenText, newChild]
    });
  }
  //...
}
//...
```
- We create the text we want to add, then we add it on the end of the list
- The `[...array, newElem]` syntax is equivalent to `array.concat([newElem])` which is a nice immutable way to "update" an array by creating a new array vs. mutating in place

Time to render the children!

going back to the render function
```JSX
//...
class App extends React.Component {
  //...
  render() {
    return (
      <div>
        //...
        {this.state.childrenText.map(childText => <Child text={childText} />)}
      </div>
    )
  }
}
//...
```
- All we need to do now is take the `this.state.childrenText` array and transform (or map) it into an array of `Child` components, React will take care of the rest

***
Let's step through how the map works.
`this.state.childrenText` is an array, and arrays have a method called map which will iterate through an array, apply a function to each value and return the new array
We can think of it as a transformation method, in our case we are transforming it from an array of strings to an array of `Child` components
Here lies the beauty of JSX, it knows that since you've outputted an array of React components it will just transform into something like this
```JSX
<Child text={this.childrenText[0]>
<Child text={this.childrenText[1]>
<Child text={this.childrenText[2]>
//...
```
***

You've done it! if all is well you should be able to build and everything should work
