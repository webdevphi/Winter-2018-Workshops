import React from 'react'

const Items = props =>
    <ul>
        {props.items.map(item => <li>{item}</li>)}
    </ul>

class Todo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
            items: []
        }
    }

    keyPress(e) {
        this.setState({
            input: e.target.value
        })
    }

    addTodo() {
        console.log(this.state)
        this.setState({
            items: [...this.state.items, this.state.input]
        })
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.keyPress.bind(this)} />
                <button onClick={this.addTodo.bind(this)} >Add a Todo</button>
                <Items items={this.state.items} />
            </div>
        )
    }
}

export default Todo