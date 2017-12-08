import React from 'react'
import { render } from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  handleKeyPress(event) {
    const text = event.target.value;
    this.setState({ text })
  }

  render() {
    return (
      <div>
        <div>{this.props.name} says Hello to {this.state.text}!</div>
        <textarea onKeyPress={this.handleKeyPress.bind(this)} />
      </div>
    )
  }
}

render(<App name="Marcel"/>, document.getElementById('app'))