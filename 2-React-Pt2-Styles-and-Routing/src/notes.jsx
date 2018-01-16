import React from 'react'

const Note = props =>
    <div>
        {props.title}
        <br />
        <hr />
        {props.body}
        <br />
        <hr />
    </div>

const inputStyle = {
    color: 'black'
}

class Notes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            body: '',
            notes: [] // { title, body }
        }
    }

    changeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    changeBody(e) {
        this.setState({
            body: e.target.value
        })
    }

    addNote() {
        this.setState({
            notes: [...this.state.notes, {
                title: this.state.title,
                body: this.state.body
            }]
        })
    }

    render() {
        return (
            <div>
                <input type='text'
                    placeholder='Title'
                    onChange={this.changeTitle.bind(this)}
                    style={inputStyle} />
                <hr />
                <input type='text'
                    placeholder='Body'
                    onChange={this.changeBody.bind(this)}
                    style={inputStyle} />
                <br />
                <button onClick={this.addNote.bind(this)} >Add a note</button>
                <br />

                Notes - {this.state.notes.map(({ title, body }) => <Note title={title} body={body} />)}
            </div>
        )
    }
}

export default Notes