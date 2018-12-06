import React from "react";
import "../../styles/contact.css";

/*  A functional component with contactpersons 
    from props as the parameter */

const ContactPersons = ({ contactpersons }) => {
  /* The constant contactList iterates through the array contactpersons 
      and outputs the properties we want as a template */
  const contactList = contactpersons.map(contact => {
    return (
      <div
        className="contact-person col-sm-12 col-lg-6 d-inline-block"
        key={contact.id}
      >
        <div className="card contact-person-card">
          <img
            className="contact-card-img"
            src={require(`../../uploadedImg/contactPersonImg/${contact.id}`)}
            alt="img"
          />
          <div className="card-body">
            <h5 className="card-title">{contact.name}</h5>
            <p className="card-text">{contact.role}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className=" px-2 py-2 rounded text-dark mb-2 d-inline-block">
                <i className="fa fa-envelope" />
              </span>
              <p> {contact.email} </p>
            </li>
            <li className="list-group-item">
              <span className=" px-2 py-2 rounded text-dark mb-2 d-inline-block">
                <i className="fa fa-phone" />
              </span>
              <p>{contact.phone}</p>
            </li>
          </ul>
        </div>
      </div>
    );
  });
  // returning the templates sequentially
  return (
    <div className="contact-list col-sm-12 col-lg-7 d-inline-block">
      {contactList}
    </div>
  );
};

export default ContactPersons;
