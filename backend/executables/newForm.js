const questions = require(`${__dirname}/../others/datas.js`);
const Question = require(`${__dirname}/../lib/classes/Question.js`);
const SatisfactionForm = require(`${__dirname}/../lib/classes/SatisfactionForm.js`);
const db = require(`${__dirname}/../lib/db/db.js`);

(async() => {
    db.connect({ source: 'prod'});

    const satisfactionForm = new SatisfactionForm({name: 'Questionnaire de satisfaction - Salon Grandeur Nature', questions: [] });
    const newForm = await satisfactionForm.save();

    const results = [];
    for (let question of questions) {
        const newQuestion = new Question(question);
        newQuestion.formId = newForm._id;
        const save = await newQuestion.save();
        results.push(save);
    }

    // UPDATE FORM WITH QUESTIONS
    const questionsId = results.map(result => result._id);
    const updateForm = await SatisfactionForm.findByIdAndUpdate(newForm._id, {questions: questionsId});

    return {
        form: updateForm,
        questions: results
    };

})()
.then(async results => {
    
    console.log(results.form);
    process.exit(1);
})
.catch(err => console.log(err))