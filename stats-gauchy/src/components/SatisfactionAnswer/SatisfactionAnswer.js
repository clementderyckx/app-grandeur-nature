import React, { Fragment } from 'react'
import './SatisfactionAnswer.css';
import RankInput from '../RankInput/RankInput';

export default function SatisfactionAnswer({question, number, stats}) {
    console.log(question)
    const stat = stats[question._id];
    const type = question.type
    const percent = (type === "checkbox" || type === "radio" || type === "rank") ? '1' : '2'
    if(question.type != "text"){
        // console.log('okay');
        console.log(stat);
        for(let element of question.answers){
            console.log(stat[element].percentage);
        }
    }
  return (
    <div className="satisfaction-answer" key={`question-${number}`}>
        <h3 className="answer-question-label">{question.question}</h3>
            {(type === "checkbox" || type === "radio") ? <CheckBoxQuestion question={question} stat={stat} /> : null }
            {(type === "rank") ? <RankInput stat={stat}/> : null }
    </div>
  )
}

function trimQuestionType(type, question, stat){
    if(type === "checkbox" || type === "radio"){
        return question.answers.map(answer => <CheckBoxQuestion answer={answer} stat={stat} />)
    } 
    if(type === "rank"){
        return <RankInput />
    } 
}

function CheckBoxQuestion({question, stat}){
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
