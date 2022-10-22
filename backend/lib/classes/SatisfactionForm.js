const SatisfactionFormModel = require(`${__dirname}/../db/satisfactionForm.js`);
const FormAnswerModel = require(`${__dirname}/../db/formAnswer.js`);
const Question = require(`${__dirname}/Question.js`);
const Contact = require(`${__dirname}/Contact.js`);

class SatisfactionForm {

    constructor({id, name, questions, answers}){
        this.name = (name) ? name : '';
        this.questions = (questions) ? questions : [];
        this.answers = (answers) ? answers : 0;
        this.id = (id) ? id : '';
    }

    async save(){
        const satisfactionForm = new SatisfactionFormModel(this);
        const result = await satisfactionForm.save();
        return result;
    }
    
    async find(){
        const satisfactionForms = await SatisfactionFormModel.find();
        return satisfactionForms;
    }


    static async findFiltered(filter){
        const satisfactionForms = await SatisfactionFormModel.find(filter);
        return satisfactionForms;
    }
    static async findByIdAndUpdate(id, object){
        const satisfactionForms = await SatisfactionFormModel.findByIdAndUpdate(id, object, {new: true});
        return satisfactionForms;
    }

    static async saveAnswer(reqAnswers){
        const answer = new FormAnswerModel(reqAnswers);
        const save = await answer.save();
        return save;
    }

    static async getAllAnswers(){
        const answers = await FormAnswerModel.find();
        return answers;
    }

    static async getAnswersByFormId(id){
        const answers = await FormAnswerModel.find({formId: id});
        return answers;
    }

    async getThisAnswers(){
        const answers = FormAnswerModel.find({formId: this.id});
        return answers;
    }

    async getThisQuestions(){
        const questions = await Question.findByFormId(this.id);
        return questions;
    }

    /**
     * Check if the contact with the given id has already answer to the
     * @param {ObjectId} contactId 
     * @returns {Boolean}
     */
    static async checkIfAnswer(contactId, formId){
        const results = await FormAnswerModel.find({contactId: contactId, formId: formId});
        const hasAnswer = (results.length > 0) ? true : false;

        return hasAnswer;
    }

    /**
     * Creates new form and add question to it if theres iare specified
     * @param {String} formName 
     * @param {Array} questions 
     * @returns {Object}
     */
    static async newForm(formName, questions){
        const satisfactionForm = new SatisfactionForm({name: formName, questions: [] });
        const newForm = await satisfactionForm.save();
    
        const results = [];
        if(questions){
            for (let question of questions) {
                const newQuestion = new Question(question);
                newQuestion.formId = newForm._id;
                const save = await newQuestion.save();
                results.push(save);
            }
        }

        // UPDATE FORM WITH QUESTIONS
        const questionsId = results.map(result => result._id);
        const updateForm = await SatisfactionForm.findByIdAndUpdate(newForm._id, {questions: questionsId});
    
        return {
            form: updateForm,
            questions: results
        };
    }


    // STATISTICS PART

    /**
     * Generates a statistic element for question of type multiple checkboxes
     * @param {Question} question 
     */
    getSelectQuestionStat(question, results, totalAnswers){
        let questionStat = {};
        for(let answer of question.answers){
            questionStat[answer] = { count: 0, percentage: 0 };
        }

        for(let possibleAnswer of question.answers){
            this.getCount(question, results, questionStat, possibleAnswer);
            questionStat[possibleAnswer].percentage = SatisfactionForm.getPercentage(questionStat[possibleAnswer].count, totalAnswers)
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
    getCount(question, results, questionStat, possibleAnswer) {
        for(let answerArray of results[question.id]){
            for(let answer of answerArray){
                if(answer === possibleAnswer) questionStat[possibleAnswer].count ++;
            }
        }
    }

    static getPercentage(count, total){
        return Math.round( ( count / total ) * 100 );
    }

    /**
     * 
     * @param {Array{Question}} questions 
     * @param {Array{FormAnswer}} answers 
     * @returns {Object} results
     */
    async getResults(questions, answers){
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
    async getStatsFromResults(questions, results, totalAnswers){
        const stats = {};
        for(let question of questions) {
            if(question.type === 'text'){
                stats[question.id] = []
            } else {
                stats[question.id] = {};
            }
        }

        for(let question of questions) {
            if(question.type === "checkbox" || question.type === "radio" || question.type === "rank"){
                stats[question.id] = this.getSelectQuestionStat(question, results, totalAnswers);
            } else if (question.type === "text"){
                stats[question.id] = results[question.id]
            }
        }
        
        return { total: totalAnswers, stats: stats };
    }

    async getStats(){
        const questions = await this.getThisQuestions();
        const answers = await this.getThisAnswers();
        const totalAnswers = answers.length;
        
        // Generates Statistics
        const results = await this.getResults(questions, answers);
        const stats = await this.getStatsFromResults(questions, results, totalAnswers);

        return stats;
    }
    
}

module.exports = SatisfactionForm;