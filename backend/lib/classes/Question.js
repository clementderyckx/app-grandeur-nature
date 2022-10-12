const QuestionModel = require(`${__dirname}/../db/question.js`);

class Question {

    constructor({type, question, answers, obligatory}){
        this.type = type;
        this.question = question;
        this.answers = answers;
        this.obligatory = obligatory;
    }

    async save(){
        const model = new QuestionModel(this);
        const save = await model.save();
        return save;
    }

    static async find(){
        const questions = await QuestionModel.find();
        return questions;
    }

    static async findFiltered(filter){
        const questions = await QuestionModel.find(filter);
        return questions;
    }



}

module.exports = Question;