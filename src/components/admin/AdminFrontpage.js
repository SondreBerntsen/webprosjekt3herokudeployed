// Class AdminFrontpage
import React, { Component } from "react";
class AdminFrontpage extends Component {
  state = {
    pitch: "",
    dateHeader_txt: ""
  };

  componentDidMount() {
    // sets the props sent from parent 'AdminGeneral' as state
    this.setState(({ ...this.state } = this.props.frontpage));
  }

  // function for when submit button has been clicked
  handleSubmit = e => {
    e.preventDefault();
    // saves the new changes in object 'body'
    let body = {
      pitch: this.state.pitch,
      dateHeader_txt: this.state.dateHeader_txt
    };
    // sends 'body'-object to general/frontpageUpdate to update the database
    fetch(`http://localhost:5000/general/frontpageUpdate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).catch(err => console.log(err));
  };
  // function for when fields have been changed
  handleChange = e => {
    // checks name of target
    switch (e.target.name) {
      //if name equals 'pitch'..
      case "pitch":
        // .. it sets the value of target in state
        this.setState({ pitch: e.target.value });
        break;
      case "dateHeader_txt":
        this.setState({ dateHeader_txt: e.target.value });
        break;
      default:
    }
  };

  render() {
    return (
      <React.Fragment>
        <form className="col-md-8 col-lg-6" onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label>Forsidetekst</label>
              <textarea
                className="form-control"
                defaultValue={this.props.about.pitch}
                onChange={this.handleChange}
                name="pitch"
              />
            </div>
            <div className="form-group col-md-12">
              <label>Festivaldato</label>
              <input
                className="form-control"
                defaultValue={this.props.about.dateHeader_txt}
                onChange={this.handleChange}
                name="dateHeader_txt"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-info btn-sm">
            Lagre
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default AdminFrontpage;
