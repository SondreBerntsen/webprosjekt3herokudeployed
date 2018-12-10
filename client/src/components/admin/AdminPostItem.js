import React, { Component } from "react";


class AdminPostItem extends Component {
  //Handles updates  in posts
  handleUpdate = (e) => {
    e.preventDefault()
    const data = new FormData();
    data.append('id', this.props.post.id);
    data.append('title', this.refs.updateTitle.value);
    data.append('text', this.refs.updateText.value);
    data.append('img', this.refs.updateImg.files[0]);


    fetch(`/api/posts/update`, {
      method: 'POST',
      body: data
    })
      .then(function (response) {
        if (response.status >= 400) {
          throw alert('Databasen ble ikke oppdatert');
        }
      })
      .then(_ => {
        this.props.getPostList();
        document.getElementById('toggleEditPost' + this.props.post.id).click();//toggle form back
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <React.Fragment>
        <div className="elementCardAdmin row">
          <p className="col-lg-5">
            <span className="smallHeading">Tittel: </span> {this.props.post.title}
          </p>
          <p className="col-lg-4">
            <span className="smallHeading">Dato: </span> {this.props.post.date}
          </p>
          <div className="col-lg-3">
            <button className="btn btn-sm btn-danger btnInElementAdmin" onClick={() => { this.props.handleDelete(this.props.post.id) }}>
              Slett
          </button>
            <button
              className="btn  btn-secondary btnInElementAdmin btn-sm"
              type="button"
              data-toggle="collapse"
              data-target={"#post" + this.props.post.id}
              aria-expanded="false"
              aria-controls={"post" + this.props.post.id}
              id={'toggleEditPost' + this.props.post.id}
            >
              Rediger
          </button>
          </div>
        </div>
        <div className="editScheduleItem collapse" id={"post" + this.props.post.id}>
          <form className="col-md-8 col-lg-6" >
            <div className="form-group">
              <label>Tittel</label>
              <input
                type="text"
                className="form-control"
                defaultValue={this.props.post.title}
                ref="updateTitle"
              />
            </div>
            <div className="form-group">
              <label>Bilde</label>
              <input type="file" className="form-control" ref="updateImg" />
            </div>
            {/*If postid is not set no not try to display images*/}
            {this.props.post.id !== "" ?
              (<img className="newsImgEdit "
                src={require('../../uploadedImg/postImg/' + this.props.post.id)}
                alt="newsImg" />) : null}
            <div className="form-group">
              <label>Ny Tekst</label>
              <textarea
                className="form-control textareaNews"
                defaultValue={this.props.post.text}
                ref="updateText"
              />
            </div>
            <button type="button" className="btn btn-info btn-sm" onClick={this.handleUpdate}>
              Rediger
          </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
};

export default AdminPostItem;
