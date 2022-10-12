import './SearchInput.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import React from 'react'

export default function SearchInput() {

    const [isActive, updateIsActive] = useState(false);

  return (
    <div className="search-input">
        <input type="text" name="search" id="search" className='search-input-input' placeholder='Rechercher'/> 
    <div className="search-input-btn" role={"button"}><FontAwesomeIcon icon={faMagnifyingGlass}/></div>
  </div>
  )
}
