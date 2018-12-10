import React, { Component } from "react";
import AdminPostItem from "../AdminPostItem";
import { Link } from "react-router-dom";

class AdminPosts extends Component {
  state = {
    posts: [{ id: '', title: '', text: '', date: '' }],
    years: [],
    year: ''
  };
  componentDidMount() {
    let path = this.props.match.params.year;
    this.setState({ year: path })
    this.getPostList();
    this.getYearList();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.year !== prevState.year) {
      return { year: nextProps.match.params.year };
    }
    else {
      return null;
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.year !== this.state.year) {
      this.getPostList();
    }
  }
  getYearList = _ => {
    fetch(`/api/newsYearList`)
      .then(response => response.json())
      .then(response => this.setState({ years: response }))
      .catch(err => console.log(err));
  };
  getPostList = _ => {
    let path = this.props.match.params.year;
    if (isNaN(path)) {
      fetch(`/api/posts`)
        .then(response => response.json())
        .then(response => this.setState({ posts: response }))
        .catch(err => console.log(err));
    } else {
      fetch(`/api/posts?year=` + path)
        .then(response => response.json())
        .then(response => this.setState({ posts: response }))
        .catch(err => console.log(err));
    }
  };
  formAfterSubmit = _ => {
    document.getElementById("venueForm").reset();
    document.getElementById('toggleVenueFormBtn').click();
    this.getPostList();
  }
  handleDelete = (id) => {

    let body = {
      id: id
    }
    if (window.confirm('Are you sure you wish to delete this item?')) {
      fetch(`/api/posts/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(_ => {
          this.getPostList();
        })
        .catch(err => console.log(err))
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();


    const data = new FormData();
    data.append('title', this.refs.createVenueTitle.value);
    data.append('img', this.refs.createVenueImg.files[0]);
    data.append('text', this.refs.createVenueText.value);

    fetch(`/api/posts/add`, {
      method: 'POST',
      body: data
    })
      .then(function (response) {
        if (response.status >= 400) {
          throw alert('oh no');
        }
      })
      .then(_ => {
        this.formAfterSubmit();
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="container tablesAdmin col-md-9 col-lg-10">
        <div className="row">
          <div className='col-md-4'>
            <button
              className=" createNewBtn btn btn-info btn-sm"
              type="button"
              data-toggle="collapse"
              id="toggleVenueFormBtn"
              data-target="#newPostForm"
              aria-expanded="false"
              aria-controls="newPostForm"
            >
              Legg til nyhet
            </button>
          </div>
          <div className="col-md-8">
            <div className="float-right">
              {this.state.years.map(function (year) {
                return (
                  <Link
                    className="btn ml-1 mr-1"
                    to={"/admin/posts/" + year.year}
                    key={year.year}
                  >
                    {year.year}
                  </Link>
                );
              })}
            </div>

          </div>
        </div>


        <div className="collapseForm col-12 collapse" id="newPostForm">
          <form onSubmit={this.handleSubmit} id="venueForm" className="col-md-8 col-lg-6">
            <div className="form-row">
              <label>Tittel</label>
              <input
                type="text"
                className="form-control"
                placeholder="Legg til tittel"
                ref="createVenueTitle"
                required
              />
            </div>
            <div className="form-row">
              <label>Bilde</label>
              <input
                type="file"
                className="form-control"
                ref="createVenueImg"
              />
            </div>
            <div className="form-group">
              <label>Nyhetstekst</label>
              <textarea
                type="text"
                className="form-control textNewPost"
                ref="createVenueText"
                required />
            </div>
            <button type="submit" className="btn btn-info btn-sm">
              Send
            </button>
          </form>
        </div>
        {this.state.posts.map(post => (
          <div key={post.id}>
            <AdminPostItem post={post} handleDelete={this.handleDelete} getPostList={this.getPostList} />
          </div>
        ))}
      </div>
    );
  }
}

export default AdminPosts;
