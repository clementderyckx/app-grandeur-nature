require('dotenv').config({ path: `${__dirname}/../.env` });
const db = require(`${__dirname}/../lib/db/db.js`);
const formAnswers = require(`${__dirname}/../lib/db/formAnswer.js`);
const SatisfactionForm = require(`${__dirname}/../lib/classes/SatisfactionForm.js`);
const Question = require(`${__dirname}/../lib/classes/Question.js`);

(async () => {
    
    db.connect({ source: 'prod'});
    const form = new SatisfactionForm({id: process.env.SATISFACTIONFORMID})
    const questions = await form.getThisQuestions();
    console.log(questions[0]);
    const answers = await form.getThisAnswers();
    
    // Creates the object
    const results = {};
    const stats = {};
    const ids = [];
    for(let question of questions) {
        results[question.id] = [];
        stats[question.id] = {};
        ids.push(question.id);
    }
    console.log(answers);
    
    // Filled each variable with the answers
    for (let answer of answers){
        for(let result of answer.answers){
            results[result.id].push(result.results)
        }
    }

    const totalAnswers = answers.length;

    
    for(let question of questions) {
        if(question.type === "checkbox" || question.type === "radio"){
            stats[question.id] = getCheckBoxQuestionStat(question, results, totalAnswers);
        }
    }

    return results;

})().then( answers => process.exit(1) ).catch( err => console.log(err) );

/**
 * Generates a statistic element for question of type multiple checkboxes
 * @param {Question} question 
 */
function getCheckBoxQuestionStat(question, results, totalAnswers){
    let questionStat = {};
    for(let answer of question.answers){
        questionStat[answer] = { count: 0, percentage: 0 };
    }

    for(let possibleAnswer of question.answers){
        getCountCheck(question, results, questionStat, possibleAnswer);
        questionStat[possibleAnswer].percentage = getPercentage(questionStat[possibleAnswer].count, totalAnswers)
    }
    return questionStat;

}
/**
 * Get how many responses correspond to each possible question
 * @param {Question} question 
 * @param {Array} results 
 * @param {Object} questionStat 
 * @param {String} possibleAnswer 
 */
function getCountCheck(question, results, questionStat, possibleAnswer) {
    for(let answerArray of results[question.id]){
        for(let answer of answerArray){
            if(answer === possibleAnswer) questionStat[possibleAnswer].count ++;
        }
    }
}

function getPercentage(answerCount, totalAnswers){
    return Math.round( ( answerCount / totalAnswers ) * 100 );
}