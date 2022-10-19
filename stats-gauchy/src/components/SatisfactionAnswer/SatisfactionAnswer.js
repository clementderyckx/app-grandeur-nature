import React from 'react'
import './SatisfactionAnswer.css';

export default function SatisfactionAnswer({question, number, stats}) {
    // console.log(stats)
    const stat = stats[question._id];
    const type = question.type
    const percent = (type === "checkbox" || type === "radio" || type === "rank") ? '1' : '2'
    // console.log('type : ' + type);
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
        <div className="answer-answers checkbox-question">
            {question.answers.map(answer => (
                
                <div className="answer-item checkbox-question-answer">
                    <div className="answer-item-element">
                        <div className="checkbox"></div>
                        <p className="answer-item-label">{answer}</p>
                    </div>
                    <div className="question-stat">
                        <p className="question-stat-value">{stat[answer].percentage}%</p>
                    </div>
                </div>
            ))}

        </div>
    </div>
  )
}
