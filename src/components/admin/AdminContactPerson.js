// AdminContactPerson.js
import React, { Component } from "react";

class AdminContactPerson extends Component {
  state = {};
  handleChange = e => {
    e.preventDefault();
    switch (e.target.name) {
      // editing contact persons
      case "editContactPersonName":
        this.setState({ editContactPersonName: e.target.value });
        break;
      case "editContactPersonRole":
        this.setState({ editContactPersonRole: e.target.value });
        break;
      case "editContactPersonPhone":
        this.setState({ editContactPersonPhone: e.target.value });
        break;
      case "editContactPersonEmail":
        this.setState({ editContactPersonEmail: e.target.value });
        break;
      default:
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    const data = new FormData();

    if (this.refs.contactImg.files[0] !== undefined) {
      data.append("id", this.props.contact.id);
      data.append("img", this.refs.contactImg.files[0]);
      data.append("name", this.refs.editContactPersonName.value);
      data.append("role", this.refs.editContactPersonRole.value);
      data.append("phone", this.refs.editContactPersonPhone.value);
      data.append("email", this.refs.editContactPersonEmail.value);
      // sends 'body'-object to general/frontpageUpdate to update the database
      fetch(`http://localhost:5000/contactPersons/updateWithPicture`, {
        method: "POST",
        body: data
      })
        .then(_ => {
          this.props.getContactList();
        })
        .catch(err => console.log(err));
    } else {
      data.append("id", this.props.contact.id);
      data.append("name", this.refs.editContactPersonName.value);
      data.append("role", this.refs.editContactPersonRole.value);
      data.append("phone", this.refs.editContactPersonPhone.value);
      data.append("email", this.refs.editContactPersonEmail.value);
      // sends 'body'-object to general/frontpageUpdate to update the database
      fetch(`http://localhost:5000/contactPersons/updateWithoutPicture`, {
        method: "POST",
        body: data
      })
        .then(_ => {
          this.props.getContactList();
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const { props } = this;

    return (
      <div>
        <div className="elementCardAdmin row">
          <p className="col-md-10">
            <span className="smallHeading">{props.contact.name}</span>
          </p>
          <div className="col-md-2">
            <button
              className="btn btn-secondary btnInElementAdmin btn-sm"
              type="button"
              data-toggle="collapse"
              data-target={"#contactPersonForm" + props.contact.id}
              aria-expanded="false"
              aria-controls={"contactPersonForm" + props.contact.id}
            >
              Rediger
            </button>
          </div>
        </div>

        <div
          className="collapse editScheduleItem"
          id={"contactPersonForm" + props.contact.id}
        >
          <form
            className="col-md-8 col-lg-6"
            name="editContactPerson"
            onSubmit={this.handleSubmit}
          >
            <div className="form-row">
              <div className="form-group col-md-6 pl-0">
                <label>Navn</label>
                <input
                  type="text"
                  ref="editContactPersonName"
                  defaultValue={props.contact.name}
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-6 pl-0">
                <label>Stilling</label>
                <input
                  type="text"
                  ref="editContactPersonRole"
                  defaultValue={props.contact.role}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6 pl-0">
                <label>Telefonnummer</label>
                <input
                  type="number"
                  ref="editContactPersonPhone"
                  defaultValue={props.contact.phone}
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-6 pl-0">
                <label>Epost adresse</label>
                <input
                  type="email"
                  ref="editContactPersonEmail"
                  defaultValue={props.contact.email}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12 pl-0">
                <label> Bilde</label>
                <input type="file" ref="contactImg" className="form-control" />
              </div>
              {props.contact.id !== "" ? (
                <img
                  className="contactImgEdit"
                  src={require("../../uploadedImg/contactPersonImg/" +
                    props.contact.id)}
                  alt="contactpersonImg"
                  id="contactpersonImg"
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
