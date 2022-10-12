import React from 'react'
import './Button.css';
export default function Button({text, actionType, handleClick}) {

    const getActionClass = (actionType === "main") ? 'btn-main-action' : 'secondary-action-btn'; 
  return (
    <div className={`btn ${getActionClass}`} role="button" onClick={handleClick}>
        <span className="btn-text">
            {text}
        </span>
    </div>
  )
}
