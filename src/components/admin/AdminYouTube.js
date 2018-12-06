// Class AdminYouTube
import React, { Component } from "react";
class AdminYouTube extends Component {
  state = {
    livestream_id: "",
    YouTube_API_KEY: ""
  };

  componentDidMount() {
    // sets the props sent from parent 'AdminGeneral' as state
    this.setState(({ ...this.state } = this.props.livestream));
  }

  // function for when submit button has been clicked
  handleSubmit = e => {
    e.preventDefault();
    // saves the new changes in object 'body'
    let body = {
      livestream_id: this.state.livestream_id,
      YouTube_API_KEY: this.state.YouTube_API_KEY
    };
    // sends 'body'-object to general/frontpageUpdate to update the database
    fetch(`http://localhost:5000/livestream/update`, {
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
      case "livestream_id":
        // .. it sets the value of target in state
        this.setState({ livestream_id: e.target.value });
        break;
      case "YouTube_API_KEY":
        this.setState({ YouTube_API_KEY: e.target.value });
        break;
      default:
    }
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className="col-md-8 col-lg-6">
          <div className="form-group col-md-12 p-0">
            <label>Kanal (ID)</label>
            <input
              className="form-control"
              defaultValue={this.props.livestream.livestream_id}
              name="livestream_id"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group col-md-12 p-0">
            <label>API nøkkel</label>
            <input
              className="form-control"
              defaultValue={this.props.livestream.YouTube_API_KEY}
              name="YouTube_API_KEY"
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-info btn-sm">
            Lagre
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default AdminYouTube;
