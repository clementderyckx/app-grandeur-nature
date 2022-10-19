const Contact = require(`${__dirname}/classes/Contact.js`);
const Response = require(`${__dirname}/classes/Response.js`);
const SatisfactionForm = require(`${__dirname}/classes/SatisfactionForm.js`);
const Question = require(`${__dirname}/classes/Question.js`);


function findForm(req, res){
    const id = req.params.id;
    SatisfactionForm.findFiltered({_id: req.params.id}).then(result => res.send(new Response(200, 'Form has been found', result)))
    .catch(err => res.send(new Response(400, 'Bad Request', err)));
}

function findFormQuestions(req, res){
    const id = req.params.id;
    Question.findFiltered({formId: req.params.id})
    .then(result => res.send(new Response(200, 'Question of the form : ', result)))
    .catch(err => res.send(new Response(400, 'Bad Request', err)));
    
}

function registerFormAnswers(req, res){
    SatisfactionForm.saveAnswer(req.body).then(result => {
        res.send(new Response(200, 'New answer registered', result))
    }).catch(err => res.send(new Response(400, 'Bad Request', [])))
}

function checkIfContactHasAnswer(req, res){
        const formId = req.params.formId;
        const contactId = req.params.contactId;
        Contact.findFiltered({_id: contactId}).then(contact => {
            if(contact.length === 0){
                res.send(new Response(404, `Contact with id ${contactId} doens't exists`, [])); 
            } else {
                SatisfactionForm.checkIfAnswer(contactId, formId).then(result => {
                    if(result) {
                        res.send(new Response(400, 'Contact has already answer to the form', contact)) 
                    } else {
                        res.send(new Response(200, `Contact can answer to the form`, contact))
                    }
                }).catch(err => res.send(500, 'An error occured', err))
            }
    
        }).catch(err => res.send(new Response(404, `Contact with id ${contactId} doens't exists`, err)))
}

function getFormAnswers(req, res){
    console.log('request received');
    SatisfactionForm.getAllAnswers()
    .then(answers => res.send( new Response(200, 'Answers of the form : ', answers)))
    .catch(err => res.send( new Response(500, "Error on fetching answers", "There was an error whil attempt to fetch formAnswers")));
}

function getFormStats(req, res){
    const form = new SatisfactionForm({id: req.params.formId})
    form.getStats()
    .then(results => res.send( new Response(200, 'Form has been found and stats generated', results) ))
    .catch(err => { console.log(err); res.send( new Response(500, "Internal error on generating statistics, please try again in a moment", err) )})
}

module.exports = {
    findForm: findForm,
    findFormQuestions: findFormQuestions,
    registerFormAnswers: registerFormAnswers,
    checkIfContactHasAnswer: checkIfContactHasAnswer,
    getFormAnswers: getFormAnswers,
    getFormStats: getFormStats,
}