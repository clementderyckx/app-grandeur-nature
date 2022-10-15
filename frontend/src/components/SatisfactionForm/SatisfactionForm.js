import './SatisfactionForm.css';
import {ReactComponent as LogoGrandeurNature} from './../../imgs/logo-grandeur-nature.svg';
import {ReactComponent as LogoSocodip} from './../../imgs/logo-socodip2021.svg';
import {ReactComponent as LogoGauchy} from './../../imgs/logo-gauchy.svg';
import SatisfactionQuestion from '../SatisfactionQuestion/SatisfactionQuestion';
// import questions from './questions';
import Button from '../Button/Button';
import React, { useState, useEffect } from 'react';
import {getContactAndQuestions, getAnswers, validateForm, postAnswers, getSubmissionMessage } from './functions';


export default function SatisfactionForm() {

  const [questions, updateQuestions] = useState([]);
  const [contact, updateContact] = useState({});
  const [message, updateMessage] = useState("");
  const [status, updateStatus] = useState("default");

  useEffect(() => {
    getContactAndQuestions(updateContact, updateQuestions, updateMessage);
  }, [])

  const submit = () => {
    const answers = getAnswers(questions);
    const isValid = validateForm(answers);
    if(isValid){
      updateStatus('onSubmit')
      postAnswers(contact, answers, updateStatus)
    } else {
      return;
    }
  }

  return (
    <div className='satisfaction-form-page'>
      <div className="satisfaction-form-page-container">

        <header className="header">
          <div className="banner">
            <div className="logo-grandeur-nature">
              <LogoGrandeurNature />
            </div>
            <div className="header-title">
              <div className="top">
                <h1 className="title-text">Salon professionnel</h1>
                <div className="logo-socodip"><LogoSocodip /></div>
              </div>
              <div className="bottom">
                <p>En associtation avec</p>
                <div className="logo-gauchy">
                  <LogoGauchy />
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <div className="form-title">
          <div className="form-title-container">
            {(message) ? <h2 className="form-title-text">{message}</h2> : (
                <h2 className="form-title-text">
                Afin de nous améliorer et vous satisfaire encore plus, <br/>
                pourriez vous répondre à ces 5 questions ?
              </h2>
            )}
          </div>
        </div>
        
        {(message === "" && (status === "default" || status === "onSubmit")) ? 
          <form action="#" className="form">
            <div className="form-container">
              {questions.map((question, index) => <SatisfactionQuestion question={question} number={index+1} key={`question-${index+1}`} />)}
              
              {(status === "onSubmit") ? <div><p>Questionnaire en cours d'envoie...</p></div> : null}
              <Button text={"Envoyer"} actionType={"main"} handleClick={submit}/>
              
            </div>
          </form>       
        : null}

        {(status === 'submitted' || status === "submitError") ?(
          <div className={`form-submission-message`}>
            <div className="form-submission-message-container">
              {getSubmissionMessage(status)}
            </div>
          </div>
        ) : null}

      </div>
    </div>
  )
}

