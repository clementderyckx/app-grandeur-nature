import React from 'react'
import './CheckboxInput.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function CheckboxInput({answer, htmlFor, type}) {
    const [isActive, updateIsActive] = useState(false);
    const handleClick = () => {

        (isActive) ? updateIsActive(false) : updateIsActive(true);
    }
  return (
    <div className="answer checkbox-answer">
        <label htmlFor={htmlFor}>
            <div className={`checkbox-input ${(isActive) ? 'checkbox-active' : ''}`} name={htmlFor} value={answer} id={htmlFor} onClick={handleClick} >
                {(isActive) ?( 
                    <div className="checkbox-icon visible">
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                ) : null}
            </div>
            <div className="checkbox-answer-text">
                {answer}
            </div>
        </label>
    </div>

  )
}
