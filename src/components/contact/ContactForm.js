import React, { Component } from "react";
import "../../styles/contact.css";

class ContactForm extends Component {
  render() {
    return (
      <div className="contact-form col-sm-12 col-lg-5 float-right d-inline-block">
        <div className="row mx-0">
          <div className="contact-form-content col-sm-12 col-lg-5 mb-4">
            <div className="card contact-form-card border-muted rounded-2">
              <div className="p-0">
                <div className="bg-muted text-dark text-center py-2 contactFormText">
                  <h3>
                    <i className="fa fa-envelope" /> Skriv til oss
                  </h3>
                  <h6 className="m-2">
                    <small className="font-weight-bold">
                      Vi svarer på eposter så raskt vi kan, og om du trenger
                      svar på noe med en gang ikke nøl med å ringe oss!
                    </small>
                  </h6>
                  <p className="contact-form-header-text blockquote-footer m-2">
                    Fyll inn formen under for å sende oss en epost.
                  </p>
                </div>
              </div>
              <div className="card-body p-3">
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-user text-dark" />
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="inlineFormInputGroupName"
                      placeholder="Navn"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group mb-2 mb-sm-0">
                    <div className="input-group-addon">
                      <i className="fa fa-envelope text-dark" />
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="inlineFormInputGroupEmail"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group mb-2 mb-sm-0">
                    <div className="input-group-addon">
                      <i className="fa fa-tag prefix text-dark" />
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="inlineFormInputGroupSubject"
                      placeholder="Emne"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group mb-2 mb-sm-0">
                    <div className="input-group-addon">
                      <i className="fa fa-pencil text-dark" />
                    </div>
                    <textarea className="form-control" />
                  </div>
                </div>
                <div className="text-center">
                  <button className="btn btn-grey btn-block text-dark rounded-0 py-2">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactForm;
