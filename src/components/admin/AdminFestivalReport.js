// Class AdminYouTube
import React, { Component } from "react";
class AdminFestivalReport extends Component {
  state = {
    title: "",
    link: "",
    language: ""
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
      id: this.state.id,
      title: this.state.title,
      link: this.state.link,
      language: this.state.language
    };
    // sends 'body'-object to general/frontpageUpdate to update the database
    fetch(`http://localhost:5000/festivalreports/update`, {
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
      case "title":
        // .. it sets the value of target in state
        this.setState({ title: e.target.value });
        break;
      case "link":
        this.setState({ link: e.target.value });
        break;
      case "language":
        this.setState({ language: e.target.value });
        break;
      default:
    }
  };

  // function for when submit button has been clicked
  handleDelete = e => {
    e.preventDefault();
    // saves the new changes in object 'body'
    let body = {
      id: this.state.id
    };
    // sends 'body'-object to general/frontpageUpdate to update the database
    fetch(`http://localhost:5000/festivalreports/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).catch(err => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <div className="listReports">
          <hr />
          <p className="festivalReportTitle">{this.props.report.title}</p>
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
            data-target={"#reportForm" + this.props.report.id}
            aria-expanded="false"
            aria-controls={"reportForm" + this.props.report.id}
          >
            Rediger
          </button>

          <div
            className="collapse editReports col-md-8 offset-2"
            id={"reportForm" + this.props.report.id}
          >
            <form className="row m-3" onSubmit={this.handleSubmit}>
              <div className="col-md-4">
                <label>Tittel</label>
                <input
                  className="form-control"
                  name="title"
                  defaultValue={this.props.report.title}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-md-5">
                <label>Link</label>
                <input
                  className="form-control"
                  name="link"
                  defaultValue={this.props.report.link}
                  onChange={this.handleChange}
                />
              </div>
              {/* checks the value of the report language*/}
              {this.props.report.language === "no" ? (
                /* outputs radiobutton 'no' as defaultChecked
                   if language is set to 'no'*/
                <div className="col-md-3">
                  <label className="lanLabel ">Språk</label>
                  <div className="d-inline-block float-left">
                    <input
                      type="radio"
                      id="no"
                      name="language"
                      value="no"
                      onChange={this.handleChange}
                      defaultChecked
                    />
                    <label className="radiobtnLabel" htmlFor="no">
                      Norsk
                    </label>
                  </div>
                  <div className="d-inline-block float-right">
                    <input
                      type="radio"
                      id="en"
                      name="language"
                      value="en"
                      onChange={this.handleChange}
                    />
                    <label className="radiobtnLabel" htmlFor="en">
                      Engelsk
                    </label>
                  </div>
                </div>
              ) : (
                /* outputs radiobutton 'en' as defaultChecked
                   if language is set to 'en'*/
                <div className="col-md-3">
                  <label className="lanLabel ">Språk</label>
                  <div className="d-inline-block float-left">
                    <input
                      type="radio"
                      id="no"
                      name="language"
                      value="no"
                      onChange={this.handleChange}
                    />
                    <label className="radiobtnLabel" htmlFor="no">
                      Norsk
                    </label>
                  </div>
                  <div className="d-inline-block float-right">
                    <input
                      type="radio"
                      id="en"
                      name="language"
                      value="en"
                      onChange={this.handleChange}
                      defaultChecked
                    />
                    <label className="radiobtnLabel" htmlFor="en">
                      Engelsk
                    </label>
                  </div>
                </div>
              )}
              ;
              <div className="col-md-12 float-left mt-3">
                <button type="submit" className="btn btn-info btn-sm">
                  Lagre
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminFestivalReport;
