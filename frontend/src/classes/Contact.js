class Contact {
    constructor(contact) {
        this.lastname = contact.lastname;
        this.firstname = contact.firstname;
        this.company = contact.company;
        this.phone = (contact.phone) ? contact.phone : "";
        this.email = contact.email;
        this.postCode = (contact.postCode) ? contact.postCode : '';
        this.filename = `${contact.company}-${contact.lastname}-${contact.firstname}.svg`;
    }
}

export default Contact;