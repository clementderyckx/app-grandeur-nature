import React from 'react'
import './SatisfactionAnswer.css';

export default function SatisfactionAnswer({question, number}) {
  return (
    <div className="satisfaction-answer">
        <h3 className="answer-question-label">{question.question}</h3>
        <div className="answer-answers checkbox-question">
            {question.answers.map(answer => (
                <div className="answer-item checkbox-question-answer">
                    <div className="answer-item-element">
                        <div className="checkbox"></div>
                        <p className="answer-item-label">{answer}</p>
                    </div>
                    <div className="question-stat">
                        <p className="question-stat-value">80%</p>
                    </div>
                </div>
            ))}

        </div>
    </div>
  )
}
