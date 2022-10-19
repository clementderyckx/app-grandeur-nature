import './Contacts.css';
import React from 'react'
import ContactsArray from '../ContactsArray/ContactsArray'
import SearchInput from '../SearchInput/SearchInput';
import ExpandBtn from '../ExpandBtn/ExpandBtn';
import Statistics from '../Statistics/Statistics';
import { appConfig } from '../../config';

export default function Contacts({type}) {
  const apiUrl = (type && type === 'subscribers') ? `${appConfig.apiUrl}/exports/contacts/salon/all/`: `${appConfig.apiUrl}/exports/contacts/salon/presents`;
  const donwloadContacts = ({ format }) => {
    fetch(apiUrl, {method: 'POST'})
    .then(res => res.json())
    .then(response => autodownload(response.result.url))
  }
  const title = getTitle(type);
  return (
    <div className="contacts">
      <div className="title">
        <h1>{title}</h1>
      </div>
      {/* ADD STATS ITEMS HERE */}
      <div className="contacts-stats">
        <Statistics title="Quelques Chiffres" type={type}/>
      </div>

      <div className="actions">
        <div className="actions-left"><SearchInput /></div>
        <div className="actions-right"><ExpandBtn downloadContacts={donwloadContacts}/></div>
      </div>
      <ContactsArray type={type} /> 
    </div>
  )
}

function getTitle(type){
  const base = "Bienvenue sur la page des";
  if(type === 'subscribers'){
    return `${base} inscrits du salon.`
  } else if(type === 'presents'){
    return `${base} badgés présents du salon.`
  }
}

function autodownload(url){
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'download');
  document.querySelector('body').appendChild(link);
  link.click();
}