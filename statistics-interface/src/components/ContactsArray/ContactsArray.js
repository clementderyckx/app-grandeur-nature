import './ContactsArray.css';
import React from 'react'
import TransactionsArrayRow from './../TransactionsArrayRow/TransactionsArrayRow';
import { useState, useEffect } from 'react';
import { appConfig } from '../../config';

export default function ContactsArray({type}) {
  
  const showApi = (type && type === 'subscribers') ? `${appConfig.apiUrl}/salon/contacts/all/` : `${appConfig.apiUrl}/salon/pass/all/presents/`;
  console.log('api url :');
  console.log(showApi);
  const [contacts, updateContacts] = useState([]);


  const getContact = (response) => {
    const contactsArray = [];
    for(let contact of response){
      contactsArray.push(contact);
    }
    updateContacts(contactsArray);
  }
  const fetchContacts = () => {
    fetch(showApi)
    .then( res => res.json() )
    .then( response => getContact(response))
  }


  useEffect(() => { fetchContacts() }, [])

  return (
    <div className="contacts-array">

      <TransactionsArrayRow type="tableHead" values={['Nom', "Prénom", "Société", "Code-Postal", "Tel", "Adresse-mail", "Présence"]} />
      {contacts.map((contact, i) => <TransactionsArrayRow values={contact} key={`car-${i}`}/>)}
    </div>
  )
}
