// Class AdminAbout
import React, { Component } from "react";
class AdminAbout extends Component {
  state = {
    vision_txt: "",
    organization_txt: "",
    address: ""
  };

  componentDidMount() {
    // sets the props sent from parent 'AdminGeneral' as state
    this.setState(({ ...this.state } = this.props.about));
  }

  // function for when submit button has been clicked
  handleSubmit = e => {
    e.preventDefault();
    // saves the new changes in object 'body'
    let body = {
      vision_txt: this.state.vision_txt,
      organization_txt: this.state.organization_txt,
      address: this.state.address
    };
    // sends 'body'-object to general/aboutUsUpdate to update the database
    fetch(`http://localhost:5000/general/aboutUsUpdate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).catch(err => console.log(err));
  };
  // function for when fields have been changed
  handleChange = e => {
    // checks name of target
    switch (e.target.name) {
      //if name equals 'vision_txt'..
      case "vision_txt":
        // .. it sets the value of target in state
        this.setState({ vision_txt: e.target.value });
        break;
      case "organization_txt":
        this.setState({ organization_txt: e.target.value });
        break;
      case "address":
        this.setState({ address: e.target.value });
        break;
      default:
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="elementCardAdmin row">
          <p className="col-lg-10">
            <span className="smallHeading">
              Visjon, organisasjon og kontaktadresse
            </span>
          </p>
          <div className="col-lg-2">
            <button
              className="btn  btn-secondary btnInElementAdmin btn-sm"
              type="button"
              data-toggle="collapse"
              data-target="#staticTextForm"
              aria-expanded="false"
              aria-controls="staticTextForm"
            >
              Rediger
            </button>
          </div>
        </div>
        <div className="editScheduleItem collapse" id="staticTextForm">
          <form className="col-md-8 col-lg-6" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Visjon</label>
              <textarea
                className="form-control"
                defaultValue={this.props.about.vision_txt}
                name="vision_txt"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Organisasjon</label>
              <textarea
                className="form-control"
                defaultValue={this.props.about.organization_txt}
                name="organization_txt"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Kontakt Adresse</label>
              <input
                className="form-control"
                defaultValue={this.props.about.address}
                name="address"
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="btn btn-info btn-sm">
              Lagre
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminAbout;
