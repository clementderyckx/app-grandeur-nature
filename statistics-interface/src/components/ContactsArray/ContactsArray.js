import './ContactsArray.css';
import React from 'react'
import TransactionsArrayRow from './../TransactionsArrayRow/TransactionsArrayRow';
import Pagination from '../Pagination/Pagination';
import { useState, useEffect } from 'react';
import { appConfig } from '../../config';

export default function ContactsArray({type}) {
  
  const [contacts, updateContacts] = useState([]);
  const [total, updateTotal] = useState(0);
  const [actualPage, updateActualPage] = useState(1);
  const perPage = 25;
  const apiUrl = (type && type === 'subscribers') ? `${appConfig.apiUrl}/salon/contacts` : `${appConfig.apiUrl}/salon/contacts/presents`;
  

  const getContact = (response) => {
    const contactsArray = response.contacts;
    const contacts = [];
    for(let contact of contactsArray) {
      if(contact !== null) contacts.push(contact);
    }
    updateContacts(contacts);
    updateTotal(response.totalContacts);
  }

  const fetchContacts = (pagination) => {
    const page = (pagination) ? pagination : 1;
    updateActualPage(page);

    fetch(`${apiUrl}/${perPage}/${page}`)
    .then( res => res.json() )
    .then( response => {
      getContact(response);
    })
  }



  useEffect(() => { fetchContacts() }, [])

  return (
    <div className="contacts-array">

      <TransactionsArrayRow type="tableHead" values={['Nom', "Prénom", "Société", "Code-Postal", "Tel", "Adresse-mail", "Présence"]} />
      {contacts.map((contact, i) => <TransactionsArrayRow values={contact} key={`car-${i}`}/>)}

      <Pagination perPage={perPage} total={total} actualPage={actualPage} fetchFunction={fetchContacts} />
    </div>
  )
}
