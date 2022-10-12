import React from 'react'
import "./Textarea.css";

export default function Textarea({htmlFor}) {
  return (
    <div className="textarea-input">
      <textarea name={htmlFor} id={htmlFor} className="textarea-input-input"></textarea>
    </div>
  )
}
