const db = require(__dirname + '/../lib/db/db.js');
const SatisfactionForm = require(`${__dirname}/../lib/classes/SatisfactionForm.js`);
const Question = require(`${__dirname}/../lib/classes/Question.js`);
// (async () => {

    const connect = db.connect({ source: 'local'});

//     const result = await SatisfactionForm.checkIfAnswer('6319ca952c7cdd3d1b2ec50a');
//     console.log(result);

// })()
// // .then(() => process.exit(1))
// .catch(err => console.log(err));

SatisfactionForm.checkIfAnswer('6319ca952c7cdd3d1b2ec50a', '6328afb1f5b93e7df39aee73').then(res => console.log(res))

