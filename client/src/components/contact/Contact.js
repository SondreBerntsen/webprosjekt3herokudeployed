import React, { Component } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ContactPersons from "./ContactPersons.js";
import ContactForm from "./ContactForm.js";
import "../../styles/contact.css";

class Contact extends Component {
  state = {
    contactPersons: [],
    contactAddress: []
  };

  componentDidMount() {
    this.getContactPersons();
    this.getContactAdress();
  }
  getContactAdress = _ => {
    fetch(`/api/contactAddress`)
      .then(response => response.json())
      .then(response => this.setState({ contactAddress: response[0].address }))
      .catch(err => console.error(err));
  };
  getContactPersons = _ => {
    fetch(`/api/contactPersons`)
      .then(response => response.json())
      .then(response => this.setState({ contactPersons: response.data }))
      .catch(err => console.error(err));
  };
  render() {
    // destructuring
    const { contactPersons } = this.state;
    const { contactAddress } = this.state;

    /*  ContactPersons sends the state as props to our 
        child component "ContactPersons.js. */
    return (
      <div>
        <Navbar />
        <div className="contact row mx-0">
          <div className="container">
            <div className="vh-85">
              <div className="contact-title col-sm-12 col-lg-7 d-inline-block">
                <h2>Ta gjerne kontakt med oss om du lurer på noe</h2>
                <hr />
              </div>
              <ContactForm />
              <ContactPersons contactpersons={contactPersons} />
            </div>
            <div className="col-sm-12 col-lg-12">
              <div className="contact-adress">
                <div className="px-3 text-dark ">
                  <i className="fa fa-map-marker d-inline-block float-md-none " />
                  <p>{contactAddress}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Contact;
