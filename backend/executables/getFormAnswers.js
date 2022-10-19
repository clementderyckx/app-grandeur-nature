require('dotenv').config({ path: `${__dirname}/../.env` });
const db = require(`${__dirname}/../lib/db/db.js`);
const SatisfactionForm = require(`${__dirname}/../lib/classes/SatisfactionForm.js`);
const Contact = require(`${__dirname}/../lib/classes/Contact.js`);
const Question = require(`${__dirname}/../lib/classes/Question.js`);

(async () => {
    
    db.connect({ source: 'prod'});
    const form = new SatisfactionForm({id: process.env.SATISFACTIONFORMID})
    const stats = await form.getStats();
    return stats;

})().then( answers => process.exit(1) ).catch( err => console.log(err) );

/**
 * Generates a statistic element for question of type multiple checkboxes
 * @param {Question} question 
 */
function getSelectQuestionStat(question, results, totalAnswers){
    let questionStat = {};
    for(let answer of question.answers){
        questionStat[answer] = { count: 0, percentage: 0 };
    }

    for(let possibleAnswer of question.answers){
        getCount(question, results, questionStat, possibleAnswer);
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
function getCount(question, results, questionStat, possibleAnswer) {
    for(let answerArray of results[question.id]){
        for(let answer of answerArray){
            if(answer === possibleAnswer) questionStat[possibleAnswer].count ++;
        }
    }
}

function getPercentage(answerCount, totalAnswers){
    return Math.round( ( answerCount / totalAnswers ) * 100 );
}

/**
 * 
 * @param {Array{Question}} questions 
 * @param {Array{FormAnswer}} answers 
 * @returns {Object} results
 */
async function getResults(questions, answers){
    const results = {};
    for(let question of questions) {
        results[question.id] = [];
    }
        // Filled each variable with the answers
    for (let answer of answers){
        for(let result of answer.answers){
            // console.log(answer);
            if(result.type === 'text'){
                const response = result.results[0];
                if(response.length > 0 ) results[result.id].push({ contact: await Contact.findById(answer.contactId), result: response});
            } else {
                results[result.id].push(result.results)
            }
        }
    }

    return results;
}

/**
 * 
 * @param {Array{Questions}} questions 
 * @param {Object} results 
 * @param {Number} totalAnswers 
 * @returns {Object} stats
 */
async function getStatsFromResults(questions, results, totalAnswers){
    for(let question of questions) {
        if(question.type === 'text'){
            stats[question.id] = []
        } else {
            stats[question.id] = {};
        }
    }

    for(let question of questions) {
        if(question.type === "checkbox" || question.type === "radio" || question.type === "rank"){
            stats[question.id] = getSelectQuestionStat(question, results, totalAnswers);
        } else if (question.type === "text"){
            stats[question.id] = results[question.id]
        }
    }

    return stats;
}