import React, {Component} from 'react';
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
  }

  showPosts(section) {
    var self = this;
    $.ajax({
      url: `http://localhost:7000/api/section/${section.id}`,
      method: 'GET',
      success: function(d) {
        self.setState({posts: d, view: POSTSVIEW});
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
    let posts = this.state.posts.map((post) =>
      <div className='post' key={post.id}>
        <div className='post__title'>
          {post.title}
        </div>
        <div className='post__text'>
          {post.text}
        </div>
        <div className='post__date'>
          {post.created_at}
        </div>
      </div>
    );
    return (
      <div className='posts'>
        {posts}
        <a  className='back'
            onClick={() => this.toggleView(SECTIONSVIEW)}>
            Back</a>
      </div>
    );
  }

  render() {
    switch(this.state.view) {
      case SECTIONSVIEW:
        return this.renderSections();
      case POSTSVIEW:
        return this.renderPosts();
      case POSTVIEW:
        return (<a>ololo</a>);
      default:
    }
  }
}

export default Posts;
