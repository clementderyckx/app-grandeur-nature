require('dotenv').config({ path: `${__dirname}/../.env` });
const db = require(`${__dirname}/../lib/db/db.js`);
const formAnswers = require(`${__dirname}/../lib/db/formAnswer.js`);
const SatisfactionForm = require(`${__dirname}/../lib/classes/SatisfactionForm.js`);
const Question = require(`${__dirname}/../lib/classes/Question.js`);

(async () => {
    
    db.connect({ source: 'prod'});
    const form = new SatisfactionForm({id: process.env.SATISFACTIONFORMID})
    const questions = await form.getThisQuestions();
    const answers = await form.getThisAnswers();
    const results = {};
    for(let question of questions) {
        results[question.id] = [];
    }
    for (let answer of answers){
        console.log(answer);
        for(let result of answer.answers){
            results[result.id].push(result.results)
        }
    }

    // RESULTS est ok
    // RECUPERER LE NOMBRE TOTAL DE REPONSES
    // CALCULER LE POURCENTAGE DE REPONSE PAR RAPPORT AU TOTAL
    // RECUPERER LES REPONSES TEXT EN NOMINATIF

    console.log(results);
    return results;

})().then( answers => process.exit(1) ).catch( err => console.log(err) );

function trimAnswers( answers ) {

}