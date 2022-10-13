import React from 'react'

export default function ContactShow({contact}) {

    return (!contact.firstname) ? null : (
        <div className="response-contact">
            <div className="response-contact-content">
                
                <div className="contact">
                    <p className="id">
                        <span id="contact-lastname">{contact.lastname}</span> <span id="contact-firstname">{contact.firstname}</span>
                    </p>
                    <div className="separator"></div>
                    <p className="company">
                        <span id="contact-company">{contact.company}</span>
                    </p>
                </div>

            </div>    
        </div>


      )

}
