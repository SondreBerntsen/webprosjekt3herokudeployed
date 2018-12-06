import React, { Component } from "react";
import { fixDateString, fixTimeString } from '../Functions'


class AdminReviewItem extends Component {
  state = {}
  componentDidMount() {
    this.setState(this.props.year)
    console.log(this.props.year)
  }
  handleDelete = _ => {
    /*
    let body = {
      id: this.state.id
    }
    if (window.confirm('Are you sure you wish to delete this item?')) {
      fetch('http://localhost:5000/event/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(_ => {
          this.getEventList();
        })
        .catch(err => console.log(err))
    }
    */
  }
  handleChange = (e) => {
    /*
    this.setState({ status: 'editing' })
    switch (e.target.name) {
      case 'venue':
        let venue = e.target.value.split('&&&')
        this.setState({ venue: { id: venue[0], address: venue[1] } })
        this.refs.venueIcon.innerHTML = "&#9998;"
        break;
      case 'time':
        this.setState({ time: e.target.value })
        this.refs.timeIcon.innerHTML = "&#9998;"
        break;
      case 'price':
        this.setState({ price: e.target.value })
        this.refs.priceIcon.innerHTML = "&#9998;"
        break;
      case 'date':
        this.setState({ date: e.target.value })
        console.log(this.state.date)
        this.refs.dateIcon.innerHTML = "&#9998;"
        break;
      default:
    }
    */
  }
  handleEdit = (e) => {
    let body = {
      id: '',
      year: '',
      text: ''
    }
    fetch(`http://localhost:5000/review/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then((response) => {
        response.json()
        //idkwat.
      })
      .catch(err => console.log(err))


  }
  handleSubmitRecording = (e) => {
    e.preventDefault()
    let body = {
      //get some dank values from somewhere
    }
    fetch(`http://localhost:5000/review/newRecording`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then((response) => {
        response.json()
        //idkwat. probably don't even need response, unless checking for big faulty dick
      })
      .catch(err => console.log(err))
  }
  handleSubmitImage = (e) => {
    e.preventDefault()
    let body = {
      //get some dank values from somewhere RAGNHILD HOW
    }
    fetch(`http://localhost:5000/review/newImage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then((response) => {
        response.json()
        //idkwat. probably don't even need response, unless checking for big faulty dick
      })
      .catch(err => console.log(err))
  }
  handleDeleteRecording = (id) => {
    let body = { id: id }
    if (window.confirm('Are you sure you wish to delete this item?')) {
      fetch('http://localhost:5000/review/deleteRecording', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(_ => {
          console.log("No idea what to do now, but item was deleted I guess")
        })
        .catch(err => console.log(err))
    }
  }
  handleDeleteImage = (id) => {
    let body = { id: id }
    if (window.confirm('Are you sure you wish to delete this item?')) {
      fetch('http://localhost:5000/review/deleteImage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(_ => {
          console.log("No idea what to do now, but item was deleted I guess")
        })
        .catch(err => console.log(err))
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="elementCardAdmin">
          <div className="row">
            <h3 className="col-md-10 col-sm-10" ref="title">{this.props.year.year}</h3>
            <div className="col-md-2 col-sm-2">
              <button
                className="btn  btn-secondary btnInElementAdmin btn-sm  "
                type="button"
                data-toggle="collapse"
                data-target={"#reviewItemForm" + this.props.year.id}
                aria-expanded="false"
                aria-controls={"reviewItemForm" + this.props.year.id}
              >
                Rediger
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
                    className="form-control"
                    defaultValue={this.props.year.year}
                  ></input>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label>Tekst</label>
                  <textarea
                    type="text-area"
                    className="form-control"
                    defaultValue={this.props.year.text}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-info btn-sm">
                  Rediger
                </button>
              </div>
            </form>
          </div>

          <div className="row adminEditItem">
            <label className="labelNonBlock col-md-9">Opptak</label>
            <button
              className="btn btn-secondary btnInElementAdmin btn-sm col-md-2"
              type="button"
              data-toggle="collapse"
              data-target={"#recordingsList" + this.props.year.id}
              aria-expanded="false"
              aria-controls={"recordingsList" + this.props.year.id}
            >
              Vis liste
            </button>
            <div className="collapse col-md-7 subElementLeft" id={"recordingsList" + this.props.year.id}>
              {
                this.props.year.recordings.map((link, index) => {
                  return (
                    <div key={index} className="colorandmarginchangeFIX subElement">
                      <div className="row">
                        <p className="col-md-9">{link.name}</p>
                        <button
                          className="btn btn-secondary btnInElementAdmin btn-sm col-md-2"
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
              <form>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Tittel</label>
                    <input
                      type="text"
                      className="form-control col-md-12"
                    ></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Link</label>
                    <input
                      type="text"
                      className="form-control col-md-12"
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
            <button
              className="btn btn-secondary btnInElementAdmin btn-sm col-md-2"
              type="button"
              data-toggle="collapse"
              data-target={"#imgList" + this.props.year.id}
              aria-expanded="false"
              aria-controls={"imgList" + this.props.year.id}
            >
              Vis liste
            </button>
            <div className="collapse col-md-7 subElementLeft" id={"imgList" + this.props.year.id}>
              {
                this.props.year.slides.map((slide, index) => {
                  try {
                    return (
                      <div className="row subElement">
                        <img
                          className="eventImgEdit col-md-6"
                          src={require('../../uploadedImg/sliderImg/' + slide.id)}
                          alt={this.props.year.year + '_slide_' + index}
                        />
                        <div className="col-md-6">
                          <h5>Tittel: </h5><p>{slide.title}</p>
                          <h5>Bildetekst: </h5><p>{slide.caption}</p>
                          <button className="btn btn-secondary btnInElementAdmin btn-sm">
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
              <form>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tittel</label>
                    <input
                      type="text"
                      className="form-control col-md-12"
                    ></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Bildetekst</label>
                    <input
                      type="text"
                      className="form-control col-md-12"
                    ></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Bilde</label>
                    <input
                      type="file"
                      className="marginBottom10"
                    />
                  </div>
                  <button type="submit" className="btn btn-info btn-sm">
                    Legg til
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

}

export default AdminReviewItem;