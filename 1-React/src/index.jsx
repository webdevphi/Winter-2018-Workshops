import React from 'react';
import { render } from 'react-dom';
import Child from './child.jsx';

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
    const newChild = `${this.state.text} said Hello!`;
    this.setState({
      childrenText: [...this.state.childrenText, newChild]
    });
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange.bind(this)} />
        <button onClick={this.addChild.bind(this)} >
          Add a child
        </button>
        {this.state.childrenText.map(childText => <Child text={childText} />)}
      </div>
    );
  }
}

render(<App name="Marcel"/>, document.getElementById('app'));