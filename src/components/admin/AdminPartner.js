// Class AdminYouTube
import React, { Component } from "react";
class AdminPartner extends Component {
  state = {
    id: "",
    name: "",
    partnerType: ""
  };

  componentDidMount() {
    // sets the props sent from parent 'AdminGeneral' as state
    this.setState(({ ...this.state } = this.props.report));
  }

  // function for when submit button has been clicked
  handleSubmit = e => {
    e.preventDefault();
    // saves the new changes in object 'body'
    let body = {
      id: this.props.partner.id,
      partner_name: this.state.name,
      type: this.state.partnerType
    };
    console.log(body);
    // sends 'body'-object to general/frontpageUpdate to update the database
    fetch(`http://localhost:5000/partners/update`, {
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
      case "partnerType":
        console.log(e.target.value);
        this.setState({ partnerType: e.target.value });
        break;
      default:
    }
  };

  // function for when submit button has been clicked
  handleDelete = e => {
    e.preventDefault();
    // saves the new changes in object 'body'
    let body = {
      id: this.props.partner.id
    };
    // sends 'body'-object to general/frontpageUpdate to update the database
    fetch(`http://localhost:5000/partners/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).catch(err => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <div className="m-1">
          <hr />
          {this.props.partner.partner_name}
          <button
            className="btn btn-sm btn-danger btnInElementAdmin"
            onClick={this.handleDelete}
          >
            Slett
          </button>
          <button
            className="btn btn-secondary btnInElementAdmin btn-sm"
            type="button"
            data-toggle="collapse"
            data-target={"#officialPartnerForm" + this.props.partner.id}
            aria-expanded="false"
            aria-controls={"officialPartnerForm" + this.props.partner.id}
          >
            Rediger
          </button>
          <div
            id={"officialPartnerForm" + this.props.partner.id}
            className={
              "collapse col-md-10 offset-r-2 officialPartnerForm" +
              this.props.partner.id
            }
          >
            <form className="row m-3" onSubmit={this.handleSubmit}>
              <div className="col-md-5">
                <label>Navn på samarbeidspartner</label>
                <input
                  className="form-control"
                  onChange={this.handleChange}
                  name="name"
                  defaultValue={this.props.partner.partner_name}
                />
              </div>
              {/* checks the value of the report language*/}
              {this.props.partner.type === "private" ? (
                /* outputs radiobutton 'private' as defaultChecked
                   if type is set to 'private'*/
                <div className="col-md-7">
                  <label className="col-md-7 d-block">Type partner:</label>

                  <div className="col-md-4 offset-l-2 d-inline-block">
                    <input
                      type="radio"
                      id="private"
                      name="partnerType"
                      value="private"
                      defaultChecked
                      onChange={this.handleChange}
                    />
                    <label htmlFor="private">Lokal</label>
                  </div>
                  <div className="col-md-4 offset-r-2 float-right">
                    <input
                      type="radio"
                      id="official"
                      name="partnerType"
                      value="official"
                      onChange={this.handleChange}
                    />
                    <label htmlFor="official">Offentlig</label>
                  </div>
                </div>
              ) : (
                /* outputs radiobutton 'official' as defaultChecked
                   if type is set to 'official'*/
                <div className="col-md-7">
                  <label className="col-md-7 d-block">Type partner:</label>

                  <div className="col-md-4 offset-l-2 d-inline-block">
                    <input
                      type="radio"
                      id="private"
                      name="partnerType"
                      value="private"
                      onChange={this.handleChange}
                    />
                    <label htmlFor="private">Lokal</label>
                  </div>
                  <div className="col-md-4 offset-r-2 float-right">
                    <input
                      type="radio"
                      id="official"
                      name="partnerType"
                      value="official"
                      onChange={this.handleChange}
                      defaultChecked
                    />
                    <label htmlFor="official">Offentlig</label>
                  </div>
                </div>
              )}
              <button type="submit" className="btn btn-info btn-sm ml-3 m-1">
                Lagre
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminPartner;
