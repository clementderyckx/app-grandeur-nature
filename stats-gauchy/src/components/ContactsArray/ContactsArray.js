import './ContactsArray.css';
import React from 'react'
import TransactionsArrayRow from './../TransactionsArrayRow/TransactionsArrayRow';
import { useState, useEffect } from 'react';
import { appConfig } from '../../config';

export default function ContactsArray({type}) {
  // const showApi = (type && type === 'subscribers') ? 'https://salon-gauchy.herokuapp.com/salon/contacts/all/' : 'https://salon-gauchy.herokuapp.com/salon/pass/all/presents/';
  
  const showApi = (type && type === 'subscribers') ? `${appConfig.apiUrl}/salon/contacts/all/` : `${appConfig.apiUrl}/salon/pass/all/presents/`;
  console.log('api url :');
  console.log(showApi);
  const [contacts, updateContacts] = useState([]);
  const fetchContacts = () => {
    fetch(showApi)
    .then( res => res.json() )
    .then( response => {
      console.log(response);
      const contactsArray = [];
      for(let contact of response){
        // console.log(contact);
        contactsArray.push(contact);
      }
      updateContacts(contactsArray);
    })
  }


  useEffect(() => {
    fetchContacts()
  }, [])

  return (
    <div className="contacts-array">

      <TransactionsArrayRow type="tableHead" values={['Nom', "Prénom", "Société", "Code-Postal", "Tel", "Adresse-mail", "Présence"]} />
      {contacts.map((contact, i) => <TransactionsArrayRow values={contact} key={`car-${i}`}/>)}
    </div>
  )
}
