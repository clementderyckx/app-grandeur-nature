import React from 'react'
import './ExpandBtn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function ExpandBtn({ downloadContacts }) {

    const [toggle, updateToggle] = useState(false);
    const toggleMenu = () => {
        (toggle) ? updateToggle(false) : updateToggle(true)
    }
    

    const handleClick = (format) => {
        const formatExport = (format) ? format : 'csv';
        downloadContacts(formatExport);
    }

    return (
        <div className="expand-btn" role="button">
            <div className="expand-btn-container">
                <div className="btn" onClick={toggleMenu}>
                    <span>Télécharger</span>
                    <FontAwesomeIcon icon={faCaretDown}/>
                </div>
                <div className={(toggle === false) ? "expand-btn-menu" : "expand-btn-menu visible"}>
                    <ul className="expand-btn-list">
                        <li className="expand-btn-item" onClick={downloadContacts}>
                            en .csv
                        </li>
                        {/* <li className="expand-btn-item"> */}
                            {/* en .xlsx */}
                        {/* </li> */}
                        {/* <li className="expand-btn-item"> */}
                            {/* en .pdf */}
                        {/* </li> */}
                        {/* <li className="expand-btn-item"> */}
                            {/* en .json */}
                        {/* </li> */}
                    </ul>
                </div>
            </div>

        </div>
    )
}
