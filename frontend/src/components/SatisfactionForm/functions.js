import { appConfig } from "../../config";
import React from "react";

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

// GETTING CONTACT INFOS
export function getContactAndQuestions(updateContact, updateQuestions, updateMessage) {
    const url = document.location.href.split('/');
    const contactId = url[url.length - 1];
    fetch(`${appConfig.apiUrl}/salon/satisfaction/form/${appConfig.satisfactionFormId}/check/${contactId}`, {method: 'GET'}).then(res => res.json()).then( response  => {
        const contact = response.result[0];
        if(response.status === 200){
        updateContact(contact)
        getQuestions(updateQuestions);
        } else if(response.status === 400){
        updateMessage('Vous avez déja répondu à notre questionnaire. Merci');
        } else {
        updateMessage("Vous n'avez pas été trouvé dans la base de donnée.");
        }
    }).catch(err => updateMessage("Vous n'avez pas été trouvé dans la base de donnée."))
}

function getQuestions (updateQuestions) {
    fetch(`${appConfig.apiUrl}/salon/satisfaction/form/${appConfig.satisfactionFormId}/questions/`).then(res => res.json()).then( response => {
        updateQuestions(response.result);
    })
}

/**
 * Get the answers of the questions by the id. Returns an Array Containing question and them results.
 * @param {Array} questions 
 * @returns {Array} answers
 */
export function getAnswers(questions) {
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

/**
 * Clean errors message and check if there is no required questions that are empties
 * @param {Array} answers 
 */
export function validateForm(answers){
    // CLEAN ERRORS
    const errors = document.querySelectorAll('.form-error');
    errors.forEach(error => error.remove());

    let empties = 0;
    for(let answer of answers) {
        if(answer.results.length === 0) empties++;
    }

    return (empties === 0)
}

export function postAnswers(contact, answers, updateStatus){
    fetch(`${appConfig.apiUrl}/salon/satisfaction/form/${appConfig.satisfactionFormId}/register/`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({formId: appConfig.satisfactionFormId, contactId: contact._id, answers: answers})})
        .then(res => res.json()).then(res => {
            // UPDATE STATUS AVEC LA REPONSE
            (res.status === 200) ? updateStatus('submitted') : updateStatus('submitError');
            console.log(res);
        }).catch(err => console.log(err))
}

export function getSubmissionMessage(status){
    if(status === 'submitted'){
        return <p>La réponse à votre questionnaire à été enregistrée. <br/>Merci de votre participation</p>
    } else if(status === 'submitError') {
        return <p>Une erreur est survenue lors de l'enregistrement de vos réponses. <br/>Vous pouvez retenter votre chance ultérieurement.</p>
    }
}