import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import StarRating from '../components/StarRating';
import { formatPrice } from '../helpers/price-helper';
import "./PostTable.css";


class PostTable extends Component {
  mapHeadingToCell(post, heading) {
    switch (heading) {
      case "Title": 
        return post.title;
      case "Domain": 
        return post.domain;
      case "Price":
        return `${formatPrice(post.price)}`;
      case "User Rating": 
        return <StarRating
          count={5}
          color1="#333"
          size={16}
          value={post.user.rating}
          edit={false}
        />;
      default: 
        return "Error";
    }
  }

  renderPosts(posts, headings, onSelectCell) {
    return posts.map(post => {
      return (
        <tr 
          key={post.postId}
          className="post-row"
          onClick={this.goToPost.bind(this, post)}
        > 
          {headings.map(heading => {
            let className = heading.toLowerCase();
            return (
              <td className={className} key={heading}> {this.mapHeadingToCell(post, heading)}</td>
            );
          })}
        </tr>
      );
    });
  }

  renderTableHead(headings) {
      return headings.map(heading => {
        return <th onClick={this.props.sortPosts.bind(null, heading)} key={heading}>{heading}</th>;
      });
  }

  goToPost = (post) => {
    let postId = post.postId;
    let userId;
    if (this.props.user) {
      userId = this.props.user.userId;
    } else {
      userId = post.user.userId;
    }
      this.props.history.push(`/post/${postId}/${userId}`);
  }

  render() {
    const { 
      posts,
      headings,
      responsive,
      striped,
      onSelectCell,
      loadingPosts
    } = this.props;
    return (
      <div>
      <Table className="PostTable" responsive={responsive} striped={striped}>
        <thead>
          <tr>
            {this.renderTableHead(headings)}
          </tr>
        </thead>
        <tbody>
          {this.renderPosts(posts, headings, onSelectCell)}
        </tbody>
      </Table>
      {loadingPosts && <div className="center">Loading...</div>}
      {(!loadingPosts && posts.length === 0) && <div className="center">No Local Posts Found.</div>}
      </div>
    ); 
  }
}

export default withRouter(PostTable);