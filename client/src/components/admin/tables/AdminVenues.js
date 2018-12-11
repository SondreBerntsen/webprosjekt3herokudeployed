import React, { Component } from "react";
import AdminVenuesItem from "../AdminVenuesItem";

class AdminVenues extends Component {
  state = {
    venues: [{ id: '', address: '', capacity: '' }]
  };
  componentDidMount() {
    this.getVenueList()
  }
  getVenueList = _ => {
    //sends a fetch request to get all the venues and updates the state
    fetch(`/api/venues`)
      .then(response => response.json())
      .then(response => this.setState({ venues: response }))
      .catch(err => console.log(err));
  };
  handleSubmit = (e) => {
    e.preventDefault()
    let body = {
      address: this.refs.createVenueAddress.value,
      capacity: this.refs.createVenueCapacity.value
    }
    fetch(`/api/venues/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(_ => {
        this.getVenueList()
      })
      .catch(err => console.log(err))
  }

  handleDelete = (e, id) => {
    e.preventDefault();
    let body = {
      id: id
    };
    if (window.confirm('Er du sikker på at du vil slette denne adressen?')) {
      fetch(`/api/venues/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(_ => {
          this.getVenueList()
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    return (
      <div className="container tablesAdmin col-md-9 col-lg-10">
        <button
          className=" createNewBtn btn btn-info btn-sm"
          type="button"
          data-toggle="collapse"
          data-target="#newVenueForm"
          aria-expanded="false"
          aria-controls="newVenueForm"
        >
          Legg til ny adresse
        </button>
        <div className=" collapseForm col-md-12 collapse" id="newVenueForm">
          <form className="col-md-6 col-lg-4" onSubmit={this.handleSubmit} >
            <div className="form-group">
              <label>Adresse</label>
              <input
                ref="createVenueAddress"
                type="text"
                className="form-control"
                placeholder="Legg til adresse"
                required
              />
            </div>
            <div className="form-group">
              <label>Kapasitet</label>
              <input
                ref="createVenueCapacity"
                type="number"
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-info btn-sm">
              Legg til
            </button>
          </form>
        </div>
        {/*Mapping out all of the venues in the array*/}
        {this.state.venues.map(venue => (
          <div key={venue.id}>
            <AdminVenuesItem handleDelete={this.handleDelete} venue={venue} />
          </div>
        ))}
      </div>
    );
  }
}

export default AdminVenues;
