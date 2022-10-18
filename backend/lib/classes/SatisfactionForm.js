const SatisfactionFormModel = require(`${__dirname}/../db/satisfactionForm.js`);
const FormAnswerModel = require(`${__dirname}/../db/formAnswer.js`);
const Question = require(`${__dirname}/Question.js`);

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
        console.log(this.id);
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
}

module.exports = SatisfactionForm;