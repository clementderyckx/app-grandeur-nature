import React, { Fragment } from 'react';

export default function CheckboxAnswers({question, stat}){
    return (
        <div className="answer-answers checkbox-question">
            {question.answers.map(answer => (
                <Fragment >
                    <div className="answer-item-element">
                        <div className="checkbox"></div>
                        <p className="answer-item-label">{answer}</p>
                    </div>
                    <div className="question-stat">
                        <p className="question-stat-value">{stat[answer].percentage}%</p>
                    </div>
                </Fragment>
            ))}
        </div>
    )
}