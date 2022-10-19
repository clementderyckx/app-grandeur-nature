import React from 'react'
import './SatisfactionAnswer.css';
import CheckboxAnswers from '../CheckboxAnswers/CheckboxAnswers';
import RankInput from '../RankInput/RankInput';

export default function SatisfactionAnswer({question, number, stats}) {
    console.log(question)
    const stat = stats[question._id];
    const type = question.type
    if(question.type === "text"){
        console.log(stat);
    } 
  return (
    <div className="satisfaction-answer" key={`question-${number}`}>
        <h3 className="answer-question-label">{question.question}</h3>
            {(type === "checkbox" || type === "radio") ? <CheckboxAnswers question={question} stat={stat} /> : null }
            {(type === "rank") ? <RankInput stat={stat}/> : null }
    </div>
  )
}