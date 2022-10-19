import React from 'react'
import { useState, useEffect } from 'react';
import { appConfig } from '../../config';
import SatisfactionAnswer from '../SatisfactionAnswer/SatisfactionAnswer';
import './Answers.css';

export default function Answers({title}) {

  const [questions, updateQuestions] = useState([]);
  const [stats, updateStats] = useState([]);

  useEffect(() => {
    getQuestions(updateQuestions);
    getStatistics(updateStats);
  }, [])

  return (
    <div className="reponses">
      <div className="title">
        <h1>{title}</h1>
      </div>

      <div className="answers">
        <div className="form-container">
          {questions.map((question, index) => (stats[question._id]) ? <SatisfactionAnswer stats={stats} question={question} number={index+1} key={`question-${index+1}`}/> : null )}
          
        </div>

      </div>
    </div>
  )
}
function getQuestions (updateQuestions) {
  fetch(`${appConfig.apiUrl}/salon/satisfaction/form/${appConfig.satisfactionFormId}/questions/`).then(res => res.json()).then( response => updateQuestions(response.result));
}

function getStatistics(updateStats){
  fetch(`${appConfig.apiUrl}/salon/satisfaction/form/${appConfig.satisfactionFormId}/responses/`)
  .then(response => response.json())
  .then( response => updateStats(response.result));
}