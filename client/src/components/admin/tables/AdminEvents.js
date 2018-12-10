import React, { Component } from "react";
import AdminEventItem from "../AdminEventItem";
import { Link } from "react-router-dom";

class AdminEvents extends Component {
  state = {
    events: [
      {
        id: "",
        title: "",
        text: "",
        date: "",
        time: "",
        price: "",
        youtube_link: "",
        payment_link: "",
        livestream: ""
      }
    ],
    years: [],
    venues: [{ id: "", address: "", capacity: "" }],
    mostRecentYear: true,
    year: ""
  };
  componentDidMount() {
    let path = this.props.match.params.year;
    this.setState({ year: path });
    this.getEventList();
    this.getEventYears();
    this.getVenues();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.year !== prevState.year) {
      return { year: nextProps.match.params.year };
    } else {
      return null;
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.year !== this.state.year) {
      this.getEventList();
    }
  }

  getVenues = _ => {
    fetch(`/api/venues`)
      .then(response => response.json())
      .then(response => this.setState({ venues: response }))
      .catch(err => console.log(err));
  };
  getEventYears = _ => {
    fetch(`/api/eventYearList`)
      .then(response => response.json())
      .then(response =>
        this.setState({ years: response }, () => {
          this.getMostRecentYear();
        })
      )
      .catch(err => console.log(err));
  };
  //fix var litt bortreist da dette ble laget
  getMostRecentYear() {
    let years = [];
    this.state.years.map(year => years.push(year.year));
    if (this.props.match.params.year < Math.max(...years)) {
      this.setState({ mostRecentYear: false });
    } else {
      this.setState({ mostRecentYear: true });
    }
  }
  getEventList = _ => {
    let path = this.props.match.params.year;
    if (isNaN(path)) {
      fetch(`/api/eventList`)
        .then(response => response.json())
        .then(response => this.setState({ events: response }))
        .catch(err => console.log(err));
    } else {
      fetch(`/api/eventList?year=` + path)
        .then(response => response.json())
        .then(response => this.setState({ events: response }))
        .catch(err => console.log(err));
    }
  };
  formAfterSubmit = _ => {
    document.getElementById("eventForm").reset();
    document.getElementById("toggleFormBtn").click();
    this.getEventList();
  };
  handleDelete = (e, id) => {
    e.preventDefault();
    let body = {
      id: id
    };
    if (
      window.confirm("Er du sikker på at du vil slette dette arranementet?")
    ) {
      fetch(`/api/event/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
        .then(_ => {
          this.getEventList();
        })
        .catch(err => console.log(err));
    }
  };
  handleSubmit = e => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", this.refs.createEventTitle.value);
    data.append("text", this.refs.createEventText.value);
    data.append("time", this.refs.createEventTime.value);
    data.append("date", this.refs.createEventDate.value);
    data.append("price", this.refs.createEventPrice.value);
    data.append("youtube_link", this.refs.createEventYoutube.value);
    data.append("payment_link", this.refs.createEventPayment.value);
    data.append("img", this.refs.createEventImg.files[0]);
    data.append("venue", this.refs.createEventVenue.value);
    data.append("livestream", this.state.livestream);

    fetch(`/api/event/add`, {
      method: "POST",
      body: data
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw alert("oh no");
        }
      })
      .then(_ => {
        this.formAfterSubmit();
      })
      .catch(err => console.log(err));
  };

  handleChange = e => {
    // checks name of target
    switch (e.target.name) {
      //if name equals 'language'..
      case "livestreamradio":
        // .. it sets the value of target in state
        this.setState({ livestream: e.target.value });
        break;

      default:
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="container tablesAdmin col-md-9 col-lg-10">
          <div className="row">
            <div className="col-md-4">
              <button
                className="createNewBtn btn btn-sm btn-info"
                id="toggleFormBtn"
                type="button"
                data-toggle="collapse"
                data-target="#newEventForm"
                aria-expanded="false"
                aria-controls="newEventForm"
              >
                Opprett arrangement
              </button>
            </div>
            <div className="col-md-8 ">
              <div className="float-right">
                {this.state.years.map(function(year) {
                  return (
                    <Link
                      className="btn ml-1 mr-1"
                      to={"/admin/events/" + year.year}
                      key={year.year}
                    >
                      {year.year}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="collapseForm col-12 collapse" id="newEventForm">
            <form
              onSubmit={this.handleSubmit}
              className="col-md-8 col-lg-6"
              id="eventForm"
            >
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Tittel</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    ref="createEventTitle"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Link til betaling</label>
                  <input
                    type="url"
                    pattern="https?://.+"
                    title="Inkluder http://"
                    className="form-control"
                    ref="createEventPayment"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Dato</label>
                  <input
                    type="date"
                    className="form-control"
                    ref="createEventDate"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Tid</label>
                  <input
                    type="time"
                    className="form-control"
                    ref="createEventTime"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Pris</label>
                  <input
                    type="number"
                    className="form-control"
                    ref="createEventPrice"
                    min="0"
                    defaultValue="0"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Youtube link</label>
                  <input
                    type="text"
                    className="form-control"
                    ref="createEventYoutube"
                    placeholder="https://www.youtube.com/watch?v={video-id}"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Bilde</label>
                  <input
                    type="file"
                    className="form-control"
                    ref="createEventImg"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Adresse</label>
                  <select
                    className="form-control custom-select"
                    ref="createEventVenue"
                    required
                  >
                    <option />
                    {this.state.venues.map(function(venue) {
                      return (
                        <option key={venue.id} value={venue.id}>
                          {venue.address}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  ref="createEventLivestream"
                  name="livestreamradio"
                  type="radio"
                  value="1"
                  onChange={this.handleChange}
                />
                <label className="form-check-label">Planlagt Livestream</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  ref="createEventLivestream"
                  name="livestreamradio"
                  type="radio"
                  value="0"
                  onChange={this.handleChange}
                />
                <label className="form-check-label">
                  Ingen planlagt livestream
                </label>
              </div>
              <div className="form-group">
                <label>Beskrivelse</label>
                <textarea
                  type="text"
                  className="form-control"
                  ref="createEventText"
                  required
                />
              </div>
              <div
                className="alert alert-danger"
                id="alertDB"
                role="alert"
                hidden
              >
                <strong>Noe gikk galt. Databasen ble ikke oppdatert.</strong>
              </div>
              <button type="submit" className="btn btn-info btn-sm">
                Send
              </button>
            </form>
          </div>
          {this.state.events.map(event => (
            <div key={event.id}>
              <AdminEventItem
                event={event}
                venues={this.state.venues}
                handleDelete={this.handleDelete}
                mostRecentYear={this.state.mostRecentYear}
                getEventList={this.getEventList}
              />
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default AdminEvents;
