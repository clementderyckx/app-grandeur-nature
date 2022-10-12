const db = require(`${__dirname}/../lib/db/db.js`);
const formAnswers = require(`${__dirname}/../lib/db/formAnswer.js`);


(async () => {
    
    db.connect({ source: 'prod'});

    const answers = await formAnswers.find();
    const results = [];
    for (let answer of answers) {

        console.log(answer);
        // if(answer.answers[4] != undefined){
        //     console.log(answer.answers[4].results);
        //     results.push(answer.answers[4].results);
        // } else {
        //     continue;
        // }

    }

    return results;

})().then( answers => process.exit(1) ).catch( err => console.log(err) );