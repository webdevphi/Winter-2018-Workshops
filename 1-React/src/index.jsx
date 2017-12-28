import React from 'react'
import { render } from 'react-dom'
import Child from './child.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      childrenText: []
    };
  }

  handleChange(event) {
    const text = event.target.value;
    this.setState({ text });
  }

  addChild() {
    this.setState({
      childrenText: [...this.state.childrenText, this.state.text]
    })
  }

  render() {
    return (
      <div>
        {this.props.name} says Hello!
        <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
        <button onClick={this.addChild.bind(this)} >
          Add a child 
        </button>
        {this.state.childrenText.map((childText, i) => <Child key={i} text={childText} />)}
      </div>
    )
  }
}

render(<App name="Marcel"/>, document.getElementById('app'));