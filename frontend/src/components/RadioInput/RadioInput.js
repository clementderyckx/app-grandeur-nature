import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

// SAME CSS THAN CHECKBOXINPUT

export default function RadioInput({answer, htmlFor, type, name}) {

    const handleClick = () => {
        const elements = document.querySelectorAll(`div[name="${name}"]`);
        for(let element of elements) {
            if(element.classList.contains('checkbox-active')){
                element.classList.remove('checkbox-active');
                const icon = element.querySelector('.checkbox-icon');
                if(icon.classList.contains('visible')) icon.classList.remove('visible');

            }
            if(element.getAttribute('value') === answer){
                element.classList.add('checkbox-active');
                const icon = element.querySelector('.checkbox-icon');
                if(!icon.classList.contains('visible')) icon.classList.add('visible')
            }
        }
    }

    return (
        <div className="answer checkbox-answer">
            <label htmlFor={htmlFor}>
                <div className={`checkbox-input`} name={name} id={htmlFor} value={answer} onClick={handleClick}>
                    <div className="checkbox-icon">
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                </div>
                <div className="checkbox-answer-text">
                    {answer}
                </div>
            </label>
        </div>
    )
}
