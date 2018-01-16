import React from 'react'

const root = 'https://jsonplaceholder.typicode.com/posts'

const Post = ({ post: {title, body, userId} }) =>
    <div className='card' style={{width: '50%'}}>
        <span class='card-title'>{title}</span>
        <p>{body}</p>
        <p>By - {userId}</p>
    </div>

class Posts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }
    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
    }
    componentDidMount() {
        this.getPosts()
    }
    componentDidUpdate() {
        this.getPosts()
    }
    getPosts() {
        const params = this.props.match.params
        if (params && params.getAll === 'false') {
            fetch(`${root}/1`)
                .then(res => res.json())
                .then(post =>
                    this.setState({
                        posts: [post]
                    }))
        } else {
            fetch(root)
                .then(res => res.json())
                .then(posts => this.setState({ posts }))
        }
    }
    render() {
        return (
            <div className='row'>
                <div className='col s12 m6' style={{display: 'inline'}}>
                    <div className='card-content'>
                        {this.state.posts.map(post => <Post post={post} />)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Posts