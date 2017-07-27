import React, {Component} from 'react';

class Post extends Component {

  render() {
    let post = this.props.post;
    return (
      <div>
        <div>
          {post.title}
        </div>

        Date
        <div>
          {post.created_at}
        </div>
        Description
        <div>
          {post.description}
        </div>
        Text
        <div>
          {post.text}
        </div>
      </div>
    );
  }
}

export default Post;
