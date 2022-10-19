require('dotenv').config({ path: `${__dirname}/../../.env` });
const db = require(`${__dirname}/../../lib/db/db.js`);
const Answers = require(`${__dirname}/../../lib/classes/Answers.js`);

( async() => {

    await db.connect({ source: 'prod' });
    const removedAnswers = await Answers.deleteAllEmpties();
    console.log(removedAnswers);
    return removedAnswers;

})().then(result => {
    console.log('Process is done, see removed answers below');
    console.log(result);
    process.exit(1)
}).catch(err => {console.log(err); process.exit(1)})