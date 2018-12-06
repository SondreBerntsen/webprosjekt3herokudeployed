import React, { Component } from "react";
import AdminContactPerson from "../AdminContactPerson";
import AdminAbout from "../AdminAbout";
import AdminFrontpage from "../AdminFrontpage";
import AdminYouTube from "../AdminYouTube";
import AdminFestivalReport from "../AdminFestivalReport";
import AdminPartner from "../AdminPartner";

class AdminGeneral extends Component {
  state = {
    about: [],
    contactPersons: [],
    reports: [],
    partners: [],
    livestream: [],
    reportLanguage: [],
    partnerType: [],
    partnerOfficialText: [],
    partnerPrivateText: []
  };

  componentDidMount() {
    this.getContactList();
    this.getAboutData();
    this.getReports();
    this.getPartners();
    this.getLivestreamID();
  }

  getLivestreamID = _ => {
    fetch(`http://localhost:5000/livestream`)
      .then(response => response.json())
      .then(response => this.setState({ livestream: response.data }))
      .catch(err => console.log(err));
  };

  getReports = _ => {
    fetch(`http://localhost:5000/festivalreports`)
      .then(response => response.json())
      .then(response => this.setState({ reports: response.data }))
      .catch(err => console.log(err));
  };
  getPartners = _ => {
    fetch(`http://localhost:5000/partners`)
      .then(response => response.json())
      .then(response => this.setState({ partners: response.data }))
      .catch(err => console.log(err));
  };
  getAboutData = _ => {
    fetch(`http://localhost:5000/general`)
      .then(response => response.json())
      .then(response => this.setState({ about: response.data }))
      .catch(err => console.log(err));
  };
  getContactList = _ => {
    fetch(`http://localhost:5000/contactPersons`)
      .then(response => response.json())
      .then(response => this.setState({ contactPersons: response.data }))
      .catch(err => console.log(err));
  };

  addFestivalReport = e => {
    e.preventDefault();
    // saves the new data in object 'body'
    let body = {
      title: this.refs.createReportTitle.value,
      link: this.refs.createReportLink.value,
      language: this.state.reportLanguage
    };
    /* sends 'body'-object to festivalreports/add to 
       add new festivalreport to the database     */
    fetch(`http://localhost:5000/festivalreports/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).catch(err => console.log(err));
  };

  addPartner = e => {
    e.preventDefault();
    // saves the new data in object 'body'
    let body = {
      partner_name: this.refs.createPartnerName.value,
      type: this.state.partnerType
    };
    /* sends 'body'-object to festivalreports/add to 
       add new festivalreport to the database     */
    fetch(`http://localhost:5000/partners/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).catch(err => console.log(err));
  };

  updatePartnerPrivateText = e => {
    e.preventDefault();
    // saves the new changes in object 'body'
    let body = {
      partner_txt_private: this.state.partnerPrivateText
    };
    // sends 'body'-object to general/frontpageUpdate to update the database
    fetch(`http://localhost:5000/partners/updatePrivatePartnerText`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).catch(err => console.log(err));
  };

  updatePartnerOfficialText = e => {
    e.preventDefault();
    // saves the new changes in object 'body'
    let body = {
      partner_txt_official: this.state.partnerOfficialText
    };
    // sends 'body'-object to general/frontpageUpdate to update the database
    fetch(`http://localhost:5000/partners/updateOfficialPartnerText`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).catch(err => console.log(err));
  };

  // function for when fields have been changed
  handleChange = e => {
    // checks name of target
    switch (e.target.name) {
      //if name equals 'language'..
      case "language":
        // .. it sets the value of target in state
        this.setState({ reportLanguage: e.target.value });
        break;
      case "partnerType":
        this.setState({ partnerType: e.target.value });
        break;
      case "partnerOfficialText":
        this.setState({ partnerOfficialText: e.target.value });
        break;
      case "partnerPrivateText":
        this.setState({ partnerPrivateText: e.target.value });
        break;
      default:
    }
  };

  render() {
    return (
      <div className="container tablesAdmin col-md-9 col-lg-10">
        <h2>Forside</h2>
        <div>
          <div className="elementCardAdmin row">
            <p className="col-md-10">
              <span className="smallHeading">Forsidetekst og festivaldato</span>
            </p>

            <div className="col-md-2">
              <button
                className="btn btn-secondary btnInElementAdmin btn-sm"
                type="button"
                data-toggle="collapse"
                data-target="#frontPageForm"
                aria-expanded="false"
                aria-controls="frontPageForm"
              >
                Rediger
              </button>
            </div>
          </div>
          <div className="collapse editScheduleItem" id="frontPageForm">
            {this.state.about.map(about => (
              <AdminFrontpage key={about.id} about={about} />
            ))}
          </div>
          <h2>Om oss</h2>
          <div>
            {this.state.about.map(about => (
              <AdminAbout key={about.id} about={about} />
            ))}
            <div className="elementCardAdmin row">
              <p className="col-md-10">
                <span className="smallHeading">Festivalrapporter</span>
              </p>
              <div className="col-md-2">
                <button
                  className="btn btn-secondary btnInElementAdmin btn-sm"
                  type="button"
                  data-toggle="collapse"
                  data-target="#reportsForm"
                  aria-expanded="false"
                  aria-controls="reportsForm"
                >
                  Rediger
                </button>
              </div>
            </div>
            <div className="collapse reportsForm" id="reportsForm">
              <form className="row addReport" onSubmit={this.addFestivalReport}>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Navn på rapport"
                    ref="createReportTitle"
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Link til rapport"
                    ref="createReportLink"
                  />
                </div>

                <div className="col-md-3">
                  <div className="col-md-4 float-left">
                    <label>Språk:</label>
                  </div>

                  <div className="col-md-4 d-inline-block">
                    <input
                      type="radio"
                      id="no"
                      value="no"
                      name="language"
                      ref="createReportNo"
                      defaultChecked
                      onChange={this.handleChange}
                    />
                    <label htmlFor="no">Norsk</label>
                  </div>
                  <div className="col-md-4 float-right">
                    <input
                      type="radio"
                      id="en"
                      name="language"
                      value="en"
                      ref="createReportEn"
                      onChange={this.handleChange}
                    />
                    <label htmlFor="en">Engelsk</label>
                  </div>
                </div>
                <div className="col-md-3">
                  <button
                    type="submit"
                    className="btn btn-info btn-sm float-right"
                  >
                    Legg til ny rapport
                  </button>
                </div>
              </form>
              {this.state.reports.map(report => (
                <AdminFestivalReport key={report.id} report={report} />
              ))}
            </div>
            <div className="elementCardAdmin row">
              <p className="col-md-10">
                <span className="smallHeading">Samarbeidspartnere</span>
              </p>
              <div className="col-md-2">
                <button
                  className="btn btn-secondary btnInElementAdmin btn-sm"
                  type="button"
                  data-toggle="collapse"
                  data-target="#partnersForm"
                  aria-expanded="false"
                  aria-controls="partnersForm"
                >
                  Rediger
                </button>
              </div>
            </div>
            <div className="collapse reportsForm" id="partnersForm">
              <form className="row addReport" onSubmit={this.addPartner}>
                <div className="col-md-4">
                  <input
                    ref="createPartnerName"
                    type="text"
                    className="form-control"
                    placeholder="Navn på samarbeidspartner"
                  />
                </div>

                <div className="col-md-4">
                  <div className="col-md-4 float-left">
                    <label>Type partner:</label>
                  </div>

                  <div className="col-md-4 d-inline-block">
                    <input
                      type="radio"
                      id="private"
                      name="partnerType"
                      onChange={this.handleChange}
                      value="private"
                    />
                    <label htmlFor="no">Lokal</label>
                  </div>
                  <div className="col-md-4 float-right">
                    <input
                      type="radio"
                      id="official"
                      name="partnerType"
                      onChange={this.handleChange}
                      value="official"
                    />
                    <label htmlFor="en">Offentlig</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <button
                    type="submit"
                    className="btn btn-info btn-sm float-right"
                  >
                    Legg til ny samarbeidspartner
                  </button>
                </div>
              </form>
              <hr />

              <div className="form-group col-md-12">
                <h5 className="d-inline-block">
                  Offentlige samarbeidspartnere
                </h5>
                <button
                  className="btn btn-secondary btnInElementAdmin btn-sm"
                  type="button"
                  data-toggle="collapse"
                  data-target="#officialPartnerForm"
                  aria-expanded="false"
                  aria-controls="officialPartnerForm"
                >
                  Rediger
                </button>
                <div
                  className="collapse officialPartnerForm col-md-10 mb-5"
                  id="officialPartnerForm"
                >
                  {this.state.about.map(about => (
                    <div
                      key={about.id}
                      className="form-group col-md-12 p-0 mb-5"
                    >
                      <form onSubmit={this.updatePartnerOfficialText}>
                        <label>Om offentlige samarbeidspartnere</label>
                        <textarea
                          className="form-control"
                          name="partnerOfficialText"
                          defaultValue={about.partner_txt_official}
                          onChange={this.handleChange}
                        />
                        <button
                          type="submit"
                          className="btn btn-info btn-sm mt-1"
                        >
                          Lagre
                        </button>
                      </form>
                    </div>
                  ))}

                  {this.state.partners.map(partner => (
                    <div key={partner.id}>
                      {partner.type === "official" ? (
                        <AdminPartner partner={partner} />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group col-md-12">
                <h5 className="d-inline-block">Lokale samarbeidspartnere</h5>
                <button
                  className="btn btn-secondary btnInElementAdmin btn-sm"
                  type="button"
                  data-toggle="collapse"
                  data-target="#localPartnerForm"
                  aria-expanded="false"
                  aria-controls="localPartnerForm"
                >
                  Rediger
                </button>
                <div
                  className="collapse localPartnerForm col-md-10"
                  id="localPartnerForm"
                >
                  {this.state.about.map(about => (
                    <div key={about.id} className="form-group col-md-12 p-0">
                      <form onSubmit={this.updatePartnerPrivateText}>
                        <label>Om lokale samarbeidspartnere</label>
                        <textarea
                          className="form-control"
                          name="partnerPrivateText"
                          defaultValue={about.partner_txt_private}
                          onChange={this.handleChange}
                        />
                        <button
                          type="submit"
                          className="btn btn-info btn-sm mt-1"
                        >
                          Lagre
                        </button>
                      </form>
                    </div>
                  ))}

                  {this.state.partners.map(partner => (
                    <div key={partner.id}>
                      {partner.type === "private" ? (
                        <AdminPartner partner={partner} />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2>Kontaktpersoner</h2>
              {this.state.contactPersons.map(contact => (
                <AdminContactPerson key={contact.id} contact={contact} />
              ))}
            </div>
            <div>
              <h2>Diverse</h2>
              <div className="elementCardAdmin row">
                <p className="col-md-10">
                  <span className="smallHeading">YouTube</span>
                </p>

                <div className="col-md-2">
                  <button
                    className="btn btn-secondary btnInElementAdmin btn-sm"
                    type="button"
                    data-toggle="collapse"
                    data-target="#YTIDForm"
                    aria-expanded="false"
                    aria-controls="YTIDForm"
                  >
                    Rediger
                  </button>
                </div>
              </div>
              <div className="collapse editScheduleItem" id="YTIDForm">
                {this.state.livestream.map(livestream => (
                  <AdminYouTube key={livestream.id} livestream={livestream} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminGeneral;
