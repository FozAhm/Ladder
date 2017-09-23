import React, { Component } from 'react';
import { Col, PageHeader, Button } from 'react-bootstrap';
import StarRating from '../components/StarRating';
import { invokeApig } from '../libs/aws-lib';
import { formatPrice } from '../helpers/price-helper';
import './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
      isLoading: true
    };
  }

  async componentDidMount() {
    // let post = await this.getPost(this.props.match.params);
    // if (post) {
    //   post.geoJson = JSON.parse(post.geoJson);
    //   this.setState({ post: post, isLoading: false });
    // }
    this.setState({ post: {
      title: 'Offering Wedding Photography',
      description: 'Buy my services please',
      domain: 'Photography',
      price: '10000.99',
      geoJson: {type: "POINT", coordinates: [-73.5785649,45.4969574]},
      user: {
        profileImage: '/assets/profile-avatar.svg',
        name: 'Anthony Fiorito',
        totalRating: 10,
        ratingCount: 3
      }
    }, isLoading: false });
  }

  getPost({userId, postId}) {
    return invokeApig({
      path: `/posts/${userId}/${postId}`
    });
  }

  render() {
    return ( !this.state.isLoading &&
      <div className="Post">
        <UserInfo {...this.state.post } />
        <PostInfo {...this.state.post } />
      </div>
    );
  }
}

export default Post;

const UserInfo = ({ title, description, domain, price, geoJson }) => (
  <Col md={8} xs={12} className="post-info col-md-push-4">
    <h2>TITLE</h2>
    <PageHeader className="title">{title}</PageHeader>
    <h2>DESCRIPTION</h2>
    <p className="description">{description}</p>
    <h2>DOMAIN</h2>
    <p className="domain">{domain}</p>
    <h2>PRICE</h2>
    <p className="price">{formatPrice(price)}</p>
    <h2>LOCATION</h2>
    <p className="location">{geoJson.coordinates.join(", ")}</p>
  </Col>
);

const PostInfo = ({ user, price }) => (
  <Col md={4} xs={12} className="user-info col-md-pull-8">
    <img src={user.profileImage} alt="Profile Avatar" />
    <h3>{user.name}</h3>
    <StarRating
      count={5}
      color1="#333"
      size={24}
      value={user.totalRating / user.ratingCount}
      edit={false}
    />
    <div className="actions">
      <Button
        bsStyle="info"
      >
        Email
      </Button>
      <Button
        bsStyle="success"
      >
        Pay for Service
      </Button>
    </div>
  </Col>
);