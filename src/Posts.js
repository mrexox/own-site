import React, {Component} from 'react';
import Post from './Post';
import moment from 'moment';
import $ from 'jquery';

const POSTSVIEW = 0;
const POSTVIEW = 1;
const SECTIONSVIEW = 2;

class Posts extends Component {
  constructor(params) {
    super(params);
    var self = this;
    $.ajax({
        url: 'http://localhost:7000/api/sections',
        method: 'GET',
        success: function(d) {self.setState({sections: d})},
        error: function() {console.log('error');}
    });
    this.state = {
      view: SECTIONSVIEW,
      sections: []
    };
    this.showPosts = this.showPosts.bind(this);
    this.renderSections = this.renderSections.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.showAllPosts = this.showAllPosts.bind(this);
    this.showPost = this.showPost.bind(this);
  }

  showPosts(section) {
    var self = this;
    $.ajax({
      url: `http://localhost:7000/api/section/${section.id}`,
      method: 'GET',
      success: function(d) {
        self.setState({section: section.name,
                       posts: d,
                       view: POSTSVIEW});
      },
      error: function() {console.log('error')}
    });
  }

  showPost(post) {
    this.toggleView(POSTVIEW);
    this.setState({ post:post});
  }

  togglePost(post) {
    console.log(post);
  }

  showAllPosts() {
    let self = this;
    $.ajax({
      url: 'http://localhost:7000/api/posts',
      method: 'GET',
      success: function(d) {
        self.setState({section: 'All posts',
                       posts: d,
                       view: POSTSVIEW});
      },
      error: function() {console.log('error')}
    });
  }

  renderSections() {
    let sections = this.state.sections.map((section) =>
      <li key={section.id}>
        <a className='sections__name'
          onClick={() => this.showPosts(section)}>
          {section.name}
          </a>
          - {section.description}
          </li>
        );
    sections.push(
      <li key='all'>
        <a className='sections__name'
           onClick={this.showAllPosts}>
           All Posts
        </a>
        - Show all posts ordered by date
      </li>
    );
    return (
      <ul className='sections'>
      {sections}
      </ul>
    );
  }

  toggleView(view) {
    this.setState({view: view});
  }

  renderPosts() {
    moment.locale('de');
    let posts = this.state.posts.map((post) =>
      <div className='post-display' key={post.id}>
      <div className='post-read-btn' onClick={() => this.showPost(post)}></div>
      <div className='post'>
        <h3 className='post__title'>
          <a onClick={this.togglePost.bind(this, post)}>
            {post.title}
          </a>
          </h3>
        <span className='post__date'>
            {moment(post.created_at).format('LLLL')}
        </span>
        <p className='post__description'
           dangerouslySetInnerHTML={{__html:post.description}}>
        </p>

      </div>
      </div>
    );
    return (
      <div className='posts'>
        <span className='posts__section'>
          {this.state.section}
        </span>
        {posts}
        <a  className='back'
            onClick={() => this.toggleView(SECTIONSVIEW)}>
            Back</a>
      </div>
    );
  }

  renderPost() {
      return (<div>1 Post<a>{this.state.post.text}</a>
        <a  className='back'
            onClick={() => this.toggleView(POSTSVIEW)}>
            Back</a>
        </div>)
  }

  render() {
    switch(this.state.view) {
      case SECTIONSVIEW:
        return this.renderSections();
      case POSTSVIEW:
        return this.renderPosts();
      case POSTVIEW:
        return <Post post={this.state.post} />
      default:
    }
  }
}

export default Posts;
