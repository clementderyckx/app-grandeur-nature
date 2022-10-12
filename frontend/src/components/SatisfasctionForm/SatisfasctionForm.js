import './SatisfasctionForm.css';
import {ReactComponent as LogoGrandeurNature} from './../../imgs/logo-grandeur-nature.svg';
import {ReactComponent as LogoSocodip} from './../../imgs/logo-socodip2021.svg';
import {ReactComponent as LogoGauchy} from './../../imgs/logo-gauchy.svg';
import SatisfactionQuestion from '../SatisfactionQuestion/SatisfactionQuestion';
// import questions from './questions';
import Button from '../Button/Button';
import { useState, useEffect } from 'react';

const source = 'prod';
// const formId = '6328afb1f5b93e7df39aee73';
const formId = (source === 'local') ? '6328afb1f5b93e7df39aee73' : '6328affa6931a17fa3aa404b';
const apiUrl = (source === 'local') ? 'http://localhost:4009' : 'https://salon-gauchy.herokuapp.com';
export default function SatisfasctionForm() {

  const [answers, updateAnswers] = useState([]);
  const [questions, updateQuestions] = useState([]);
  const [contact, updateContact] = useState({});
  const [message, updateMessage] = useState("");
  const [status, updateStatus] = useState("default");


  const getDatasAndFetchForm = () => {
    const url = document.location.href.split('/');
    // GETTING CONTACT INFOS
    const contactId = url[url.length - 1];
    fetch(`${apiUrl}/salon/satisfaction/form/${formId}/check/${contactId}`, {method: 'GET'}).then(res => res.json()).then( response  => {
      const contact = response.result[0];
      if(response.status === 200){
        updateContact(contact)
        getQuestions(updateQuestions);
      } else if(response.status === 400){
        updateMessage('Vous avez déja répondu à notre questionnaire. Merci');
      }else if(response.status === 404){
        updateMessage("Vous n'avez pas été trouvé dans la base de donnée.");
      }
    })
  }

    useEffect(() => {
      getDatasAndFetchForm();
    }, [])

  const submit = () => {
    // CLEAN ERRORS
    const errors = document.querySelectorAll('.form-error');
    errors.forEach(error => error.remove());

    // GET ANSWERS
    const formAnswers = getAnswers(questions);
    updateAnswers(formAnswers);
    console.log(formAnswers);
    let empties = 0;
    for(let answer of formAnswers) {
      if(answer.results.length === 0) empties++;
    }
    if(empties === 0){
      updateStatus('onSubmit')
      fetch(`${apiUrl}/salon/satisfaction/form/${formId}/register/`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({formId: formId, contactId: contact._id, answers: formAnswers})})
      .then(res => res.json()).then(res => {
        // UPDATE STATUS AVEC LA REPONSE
        (res.status === 200) ? updateStatus('submitted') : updateStatus('submitError');
        console.log(res);
      }).catch(err => console.log(err))
    } else {
      // window.alert(`Il y a ${empties} questions sans réponses....`);
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
              {questions.map((question, index) => <SatisfactionQuestion question={question} number={index+1} />)}
              
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

/**
 * GENERATES AN ERROR ELEMENT ON THE SPECIFIED QUESTION ON THE DOM
 * @param {String} id 
 */
function generatesError(id) {
  if(!document.querySelector(`#question${id} .form-error`)){
    const error = document.createElement('div');
    error.className = "form-error";
    const errorText = document.createElement('p');
    errorText.className = "text_error";
    errorText.innerText = "Merci de spécifier une réponse pour cette question.";
    error.appendChild(errorText);
    document.querySelector(`#question${id}`).appendChild(error);
  }
}

function getQuestions (updateQuestions) {
  fetch(`${apiUrl}/salon/satisfaction/form/${formId}/questions/`).then(res => res.json()).then( response => {
    updateQuestions(response.result);
  })
}

/**
 * Get the answers of the questions by the id. Returns an Array Containing question and them results.
 * @param {Array} questions 
 * @returns {Array} answers
 */
function getAnswers(questions) {
  const formanswers = []; 
  for(let i = 0; i < questions.length; i++) {
    // Reponse Type
    const answers = {id: questions[i]._id, formId: questions[i].formId, type: questions[i].type, question: questions[i].question, results: [], obligatory: questions[i].obligatory};
    //Récupérer la valuer texte
    if(questions[i].type === 'text'){
      const answer = document.querySelector(`#question${i+1} textarea`).value;
      answers.results.push(answer);
    } else {
    //Récupérer la valeur des "actives" elements
      const answersElems = document.querySelectorAll(`#question${i+1} div[class*="active"]`);
      // Générer des erreurs en cas de réponses vides
      if(answersElems.length === 0){
        generatesError(i+1);
      } else {
        for(let answer of answersElems) {
          answers.results.push(answer.getAttribute('value'));
        }
      }

    }
    formanswers.push(answers);
  }
  return formanswers;

}

function getSubmissionMessage(status){
  if(status === 'submitted'){
    return <p>La réponse à votre questionnaire à été enregistrée. <br/>Merci de votre participation</p>
  } else if(status === 'submitError') {
    return <p>Une erreur est survenue lors de l'enregistrement de vos réponses. <br/>Vous pouvez retenter votre chance ultérieurement.</p>
  }
}
