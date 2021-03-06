import React, { Component } from "react";


class AdminReviewItem extends Component {
  state = {
    status: 'unchanged',
    recordings: [],
    images: []
  }
  componentDidMount() {
    this.setState({ ...this.state } = this.props.year)
  }
  handleChange = (e) => {
    this.setState({ status: 'editing' })
    switch (e.target.name) {
      case 'year':
        this.setState({ year: e.target.value })
        //this.refs.venueIcon.innerHTML = "&#9998;"
        break;
      case 'text':
        this.setState({ text: e.target.value })
        //this.refs.timeIcon.innerHTML = "&#9998;"
        break;
      default:
    }
  }
  handleEdit = (e) => {
    let body = {
      id: e.target.value,
      year: this.state.year,
      text: this.state.text
    }
    fetch(`/api/review/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then((response) => {
        response.json()
      })
      .catch(err => console.log(err))

  }
  handleSubmitRecording = (e) => {
    e.preventDefault()
    let body = {
      link: this.refs.newRecordingLink.value,
      name: this.refs.newRecordingTitle.value,
      r_id: this.state.id
    }
    fetch(`/api/review/newRecording`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then((response) => {
        response.json()
      })
      .then(_ => this.updateRecordingsList())
      .catch(err => console.log(err))

  }
  handleSubmitImage = _ => {
    let body = new FormData();
    body.append('title', this.refs.newImgTitle.value)
    body.append('caption', this.refs.newImgCaption.value)
    body.append('r_id', this.state.id)
    body.append('img', this.refs.newImgFile.files[0])

    fetch(`/api/review/newImage`, {
      method: 'POST',
      body: body
    })
      .then((response) => {
        response.json()
      })
      .catch(err => console.log(err))
  }
  handleDeleteRecording = (e) => {
    let body = { id: e.target.value }
    if (window.confirm('Er du sikker på at du vil slette opptaket?')) {
      fetch('/api/review/deleteRecording', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(_ => this.updateRecordingsList())
        .catch(err => console.log(err))
    }
  }
  handleDeleteImage = (e) => {
    let body = { id: e.target.value }
    if (window.confirm('Er du sikker på at du vil slette bildet?')) {
      fetch('/api/review/deleteImage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(_ => {
          //in an ideal world, unlinking the images wouldn't result in page refresh
          this.updateImagesList()
        })
        .catch(err => console.log(err))
    }
  }
  updateRecordingsList = () => {
    fetch('/api/review/recordings?id=' + this.state.id)
      .then(response => response.json())
      .then(response => {
        this.setState({ recordings: response })
      })
      .catch(err => console.log(err))
  }

  updateImagesList = () => {

  }
  render() {
    return (
      <React.Fragment>
        <div className="elementCardAdmin">
          <div className="row">
            <h3 className="col-md-10 col-sm-10" ref="title">{this.props.year.year}</h3>
            <div className="col-md-1 col-sm-1">
              <button
                className="btn btn-secondary btnInElementAdmin btn-sm"
                type="button"
                data-toggle="collapse"
                data-target={"#reviewItemForm" + this.props.year.id}
                aria-expanded="false"
                aria-controls={"reviewItemForm" + this.props.year.id}
              >
                Rediger
              </button>
            </div>
            <div className="col-md-1 col-sm-1">
              <button
                className="btn btn-danger btnInElementAdmin btn-sm"
                type="button"
                value={this.props.year.id}
                onClick={() => {
                  this.props.handleDelete(this.props.year.id, this.props.year.slides);
                }}>
                Slett
                </button>
            </div>
          </div>
        </div>

        <div className="collapse" id={"reviewItemForm" + this.props.year.id}>
          <div className="adminEditItem">
            <form className="col-md-12" >
              <div className="form-row">
                <div className="form-group col-md-2">
                  <label>År</label>
                  <input
                    type="number"
                    name="year"
                    className="form-control"
                    defaultValue={this.props.year.year}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label>Tekst</label>
                  <textarea
                    type="text-area"
                    name="text"
                    className="form-control"
                    defaultValue={this.props.year.text}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
                <button value={this.props.year.id} type="button" onClick={this.handleEdit} className="btn btn-info btn-sm">
                  Rediger
                </button>
              </div>
            </form>
          </div>

          <div className="row adminEditItem">
            <label className="labelNonBlock col-md-9">Opptak</label>
            <div className="scrollableDiv col-md-7 subElementLeft" id={"recordingsList" + this.props.year.id}>
              {
                this.state.recordings.map((link, index) => {
                  return (
                    <div key={index} className="colorandmarginchangeFIX subElement">
                      <div className="row">
                        <p className="col-md-10">{link.name}</p>
                        <button
                          className="btn btn-danger btn-sm col-1 pull-right "
                          value={link.id}
                          onClick={this.handleDeleteRecording}
                          type="button">Slett</button>
                      </div>
                      <p>{link.link}</p>
                    </div>
                  )
                })
              }
            </div>
            <div className="col-md-4">
              <h5>Legg til nytt opptak</h5>
              <form onSubmit={this.handleSubmitRecording}>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Tittel</label>
                    <input
                      type="text"
                      name="newRecordingTitle"
                      ref="newRecordingTitle"
                      className="form-control col-md-12"
                      required
                    ></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Link</label>
                    <input
                      type="text"
                      name="newRecordingLink"
                      ref="newRecordingLink"
                      className="form-control col-md-12"
                      required
                    ></input>
                  </div>
                </div>
                <button type="submit" className="btn btn-info btn-sm">
                  Legg til
                </button>
              </form>
            </div>
          </div>

          <div className="row adminEditItem">
            <label className="col-md-9">Bilder</label>
            <div className="scrollableDiv col-md-7 subElementLeft" id={"imgList" + this.props.year.id}>
              {
                this.props.year.slides.map((slide, index) => {
                  try {
                    return (
                      <div key={index} className="row subElement">
                        <img
                          className="eventImgEdit col-md-6"
                          src={require('../../uploadedImg/sliderImg/' + slide.id)}
                          alt={this.props.year.year + '_slide_' + index}
                        />
                        <div className="col-md-6">
                          <h5>Tittel: </h5><p>{slide.title}</p>
                          <h5>Bildetekst: </h5><p>{slide.caption}</p>
                          <button value={slide.id} onClick={this.handleDeleteImage} className="btn btn-danger btnInElementAdmin btn-sm">
                            Slett
                          </button>
                        </div>
                      </div>
                    )
                  }
                  catch (err) {
                    return null
                  }
                })
              }
            </div>
            <div className="col-md-4">
              <h5>Last opp nytt bilde</h5>
              <form onSubmit={this.handleSubmitImage}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tittel</label>
                    <input
                      type="text"
                      ref="newImgTitle"
                      className="form-control col-md-12"
                      required
                    ></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Bildetekst</label>
                    <input
                      type="text"
                      ref="newImgCaption"
                      className="form-control col-md-12"
                      required
                    ></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="file"
                      ref="newImgFile"
                      className="marginBottom10"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-info btn-sm">
                  Legg til
                  </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

}

export default AdminReviewItem;