const express = require('express');
const Response = require(`${__dirname}/../lib/classes/Response.js`);
const satisfactionLib = require(`${__dirname}/../lib/satisfaction.js`);

const satisfactionRouter = express.Router();

satisfactionRouter.post('/', (req, res) => {
    console.log(req.body);
    res.send(new Response(200, 'ok', []));
})

satisfactionRouter.post('/form/new/', (req, res, ) => {
    console.log(req.body);
    res.send(new Response(200, 'ok', []));
})

// GET ANSWERS OF THE FORM BY ID
// TODO : ADD ID PARAMS IN REQUEST FOR PROD
satisfactionRouter.get('/form/answers', (req, res) => satisfactionLib.getFormAnswers(req, res))


// GET A FORM OBJECT
satisfactionRouter.get('/form/:id', (req, res) => satisfactionLib.findForm(req, res));

// GET QUESTIONS OF THE FORM BY ID
satisfactionRouter.get('/form/:id/questions', (req, res) => satisfactionLib.findFormQuestions(req, res));

// REGISTER FORM ANSWERS
satisfactionRouter.post('/form/:id/register', (req, res) => satisfactionLib.registerFormAnswers(req, res));

// REGISTER THE FORM WITH ITS QUESTIONS
satisfactionRouter.get('/form/:formId/check/:contactId', (req, res) =>  satisfactionLib.checkIfContactHasAnswer(req, res))

// STATISTICS FOR SPECIFIC FORM ID
satisfactionRouter.get('/form/:formId/responses', (req, res) =>  satisfactionLib.getFormStats(req, res))




// /**
//  * TODO FOR STAT!!!!
//  */
// satisfactionRouter.get('/form/get/all', (req, res, ) => {
//     res.send(new Response(200, 'ok', []));
//     ();
// })


// satisfactionRouter.get('/questions/', (req, res) => {
//     Question.find().then(result => res.send(new Response(200, 'Vos questions servis sur un plateau', result)))
// })


module.exports = satisfactionRouter;