const FormAnswerModel = require(`${__dirname}/../db/formAnswer.js`);

class Answers {

    constructor({id, formId}){
        this.id = (id) ? id : undefined ;
        this.formId = (formId) ? formId : undefined ;
    }

    static async findByFormId(){
        const answers = await FormAnswerModel.find({ formId: this.formId });
        return answers;
    }

    static async deleteEmptiesByFormId(){
        const answers = await FormAnswerModel.find({ formId: this.formId });
        const idsToDelete = []
        for(let answer of answers) {
            if(answer.answers.length === 0){
                idsToDelete.push(answer.id);
            }
        }
        const removed = [];
        for(let answerId of idsToDelete){
            const removedAnswer = await FormAnswerModel.findByIdAndDelete(answerId);
            removed.push(removedAnswer);
        }
        return removed;
    }

    /**
     * Gets all the answers no matter which form it is, checks if answers Array is Empty, if it is, delete the answer
     */
    static async deleteAllEmpties(){
        const answers = await FormAnswerModel.find();
        const idsToDelete = []
        for(let answer of answers) {
            if(answer.answers.length === 0){
                idsToDelete.push(answer.id);
            }
        }
        const removed = [];
        for(let answerId of idsToDelete){
            const removedAnswer = await FormAnswerModel.findByIdAndDelete(answerId);
            removed.push(removedAnswer);
        }
        return removed;
    }

}

module.exports = Answers;