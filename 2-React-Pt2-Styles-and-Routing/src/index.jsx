// Needed for jsx
import React from 'react'
import { render } from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Link,
    IndexRouter
} from 'react-router-dom'

import Todo  from './todo.jsx'
import Notes from './notes.jsx'
import Posts from './posts.jsx'

const App = props => (
    <div>
        <nav>
            <ul id="nav-mobile" className="left mnnn hide-on-med-and-down">
                <li><Link to='/todo' >Todo</Link></li>
                <li><Link to='/notes' >Notes</Link></li>
                <li><Link to='/posts/true' >Posts</Link></li>
                <li><Link to='/posts/false' >Single post</Link></li>
            </ul>
        </nav>

        <Route path='/todo' component={Todo} />
        <Route path='/notes' component={Notes} />
        <Route path='/posts/:getAll' component={Posts} />
    </div>
)

render(
    <Router>
        <App />
    </Router>, document.getElementById('app'))