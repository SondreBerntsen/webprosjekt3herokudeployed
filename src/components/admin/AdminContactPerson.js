import React, { Component } from "react";

class AdminContactPerson extends Component {
  state = {
    id: "",
    name: "",
    role: "",
    phone: "",
    email: ""
  };

  componentDidMount() {
    // sets the props sent from parent 'AdminGeneral' as state
    this.setState(({ ...this.state } = this.props.contact));
  }

  // function for when submit button has been clicked
  handleSubmit = e => {
    e.preventDefault();
    // saves the new changes in object 'body'
    let body = {
      id: this.state.id,
      name: this.state.name,
      role: this.state.role,
      phone: this.state.phone,
      email: this.state.email
    };
    // sends 'body'-object to general/frontpageUpdate to update the database
    fetch(`http://localhost:5000/contactPersons/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).catch(err => console.log(err));
  };
  // function for when fields have been changed
  handleChange = e => {
    // checks name of target
    switch (e.target.name) {
      //if name equals 'livestream_id'..
      case "name":
        // .. it sets the value of target in state
        this.setState({ name: e.target.value });
        break;
      case "role":
        this.setState({ role: e.target.value });
        break;
      case "phone":
        this.setState({ phone: e.target.value });
        break;
      case "email":
        this.setState({ email: e.target.value });
        break;
      default:
    }
  };
  render() {
    return (
      <div>
        <div className="elementCardAdmin row">
          <p className="col-md-10">
            <span className="smallHeading">{this.props.contact.name}</span>
          </p>
          <div className="col-md-2">
            <button
              className="btn btn-secondary btnInElementAdmin btn-sm"
              type="button"
              data-toggle="collapse"
              data-target={"#contactPersonForm" + this.props.contact.id}
              aria-expanded="false"
              aria-controls={"contactPersonForm" + this.props.contact.id}
            >
              Rediger
            </button>
          </div>
        </div>

        <div
          className="collapse editScheduleItem"
          id={"contactPersonForm" + this.props.contact.id}
        >
          <form className="col-md-8 col-lg-6" onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6 pl-0">
                <label>Navn</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={this.props.contact.name}
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group col-md-6 pl-0">
                <label>Stilling</label>
                <input
                  type="text"
                  name="role"
                  defaultValue={this.props.contact.role}
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6 pl-0">
                <label>Telefonnummer</label>
                <input
                  type="number"
                  name="phone"
                  defaultValue={this.props.contact.phone}
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group col-md-6 pl-0">
                <label>Epost adresse</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={this.props.contact.email}
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12 pl-0">
                <label> Bilde</label>
                <input type="file" className="form-control" />
              </div>
              {this.props.contact.id !== "" ? (
                <img
                  className="contactImgEdit "
                  src={require("../../uploadedImg/contactPersonImg/" +
                    this.props.contact.id)}
                  alt="contactpersonImg"
                />
              ) : null}
            </div>
            <button type="submit" className="btn btn-info btn-sm">
              Lagre
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AdminContactPerson;
