import React from 'react'
import './SatisfactionAnswer.css';
import CheckboxAnswers from '../CheckboxAnswers/CheckboxAnswers';
import RankInput from '../RankInput/RankInput';
import TextAnswers from '../TextAnswers/TextAnswers';

export default function SatisfactionAnswer({question, number, stats}) {
    const stat = stats[question._id];
    const type = question.type
    const totalAnswers = stat.count;

  return (
    <div className="satisfaction-answer" key={`question-${number}`}>
        <h3 className="answer-question-label">{question.question} {totalAnswers}</h3>
            {(type === "checkbox" || type === "radio") ? <CheckboxAnswers question={question} stat={stat} /> : null }
            {(type === "rank") ? <RankInput stat={stat}/> : null }
            {(type === "text") ? <TextAnswers stat={stat}/> : null }
    </div>
  )
}

