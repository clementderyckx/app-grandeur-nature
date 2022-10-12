import React from 'react'
import { useState, useEffect } from 'react';
import SatisfactionAnswer from '../SatisfactionAnswer/SatisfactionAnswer';
import './Answers.css';

export default function Answers({title}) {

  const [questions, updateQuestions] = useState([]);

  useEffect(() => {
    getQuestions(updateQuestions);
  }, [])

  return (
    <div className="reponses">
      <div className="title">
        <h1>{title}</h1>
      </div>

      <div className="answers">
        <div className="form-container">
          {questions.map((question, index) => <SatisfactionAnswer question={question} number={index+1} key={`question-${index+1}`}/>)}
          
        </div>

      </div>
    </div>
  )
}
function getQuestions (updateQuestions) {
  fetch(`http://localhost:4009/salon/satisfaction/form/6328affa6931a17fa3aa404b/questions/`).then(res => res.json()).then( response => {
    console.log(response.result);
    updateQuestions(response.result);
  })
}