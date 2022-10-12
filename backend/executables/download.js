const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');

const testFileUrl = `${__dirname}/../files/badges/badge-C2D-Baptiste-Gacon.pdf`;
const testFileUrl2 = `${__dirname}/../files/badges/badge-TERRADIS-Clement-Terradis.pdf`;


(async () => {

    const file = fs.createReadStream(testFileUrl);
    const file2 = fs.createReadStream(testFileUrl2);

    const form = new FormData();
    form.append('badge', file);
    form.append('badge-clem', file2);

    console.log(form);
    fetch('http://localhost:8000/utilities/download-badge/', {
        method: 'POST',
        body: form
    })
    .then(() => console.log('file finished successfully'))
    .catch((err) => console.log(err));

})().catch((err) => console.log(err));  