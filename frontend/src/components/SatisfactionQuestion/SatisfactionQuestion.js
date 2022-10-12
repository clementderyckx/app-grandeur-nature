import './SatisfactionQuestion.css';
import { useEffect, useState } from "react";
import CheckboxInput from "../CheckboxInput/CheckboxInput";
import RadioInput from "../RadioInput/RadioInput";
import RankInput from "../RankInput/RankInput";
import TextInput from "../Textarea/Textarea";

export default function SatisfactionQuestion({question, number}) {

    const classnameType = getClassNameType(question);
    const [answers, updateAnswers] = useState([]);
    const [value, updateValue] = useState([]);
    useEffect(() => {
        const thisAnswers = getAsnwersInputs(question, number); 
        updateAnswers(thisAnswers);
    }, []);



    const getAsnwersInputs = (question, questionNumber) => {
        let elements = [];
        const htmlFor = (index) => (index) ? `q${questionNumber}-a${index+1}` : `q${questionNumber}`;
        const name = `question-${questionNumber}`;
        if(question.type === "checkbox"){

            const element = question.answers.map((answer, index) => elements.push(<CheckboxInput answer={answer} htmlFor={htmlFor(index)} key={htmlFor(index)}name={name} value={value} updateValue={updateValue}/>));
    
        } else if(question.type === "radio"){

            const element = question.answers.map((answer, index) => elements.push(<RadioInput answer={answer} htmlFor={htmlFor(index)} key={htmlFor(index)}name={name}/>));
    
        } else if(question.type === "rank"){

            const element =elements.push(<RankInput question={question} htmlFor={`q${questionNumber}`}/>);

        }else if(question.type === "text"){

            const element =elements.push(<TextInput question={question} htmlFor={`q${questionNumber}`}/>);
    
        }
        return elements;
    }

  return (
    <div className="satisfaction-question" id={`question${number}`}>
        <div className={`${classnameType}-question`}>
            <div className="question-label">
                <h3>{question.question}</h3>
            </div>

            <div className={`answers ${classnameType}-answers-container`}>
                {answers.map(answer => answer)}
            </div>
            
        </div>
    </div>
  )
}

function getClassNameType(question){
    let finalType = '';
    const type = question.type;
    if(type === 'checkbox' || type === 'radio'){
        finalType = 'checkbox';
    } else if(type === 'rank'){
        finalType = 'rank';
    }

    return finalType;
}