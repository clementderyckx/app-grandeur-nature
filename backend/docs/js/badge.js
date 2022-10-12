const config = {
    source: 'local',
}

const html = {
    company: document.querySelector('#company-content'),
    lastname: document.querySelector('#lastname-content'),
    firstname: document.querySelector('#firstname-content'),
    qrCode: document.querySelector('#qrcode-content'),
}
const id = document.URL.split('?')[1].split('=')[1];
let apiURL = '';
if (config.source === 'local' || config.source === 'dev') {
    apiURL = 'http://localhost:4009';
}  else if (config.source === 'prod') {
    apiURL = 'https://qrcode-checklist.herokuapp.com';
}

console.log(`${apiURL}/salon/contacts/${id}`);
fetch(`${apiURL}/salon/contacts/${id}`)
.then(res => res.json())
.then(contact => {
    //SARLDENISLEFEBVRESERVICES-LEFEBVRE-DENIS.svg
    //sarl-denis-lefebvre-services-lefebvre-marie-francoise.svg
    console.log( `../files/qrcodes/${clearString(contact.company)}-${clearString(contact.lastname)}-${clearString(contact.firstname)}.svg`);
    html.company.innerHTML = contact.company;
    html.firstname.innerHTML = contact.firstname;
    html.lastname.innerHTML = contact.lastname;
    html.qrCode.setAttribute('src', `../files/qrcodes/${clearString(contact.company).toLowerCase()}-${clearString(contact.lastname).toLowerCase()}-${clearString(contact.firstname).toLowerCase()}.svg`)

})


function clearString (string){
    let str = (string.includes('é')) ? string.replaceAll('é', 'e') : string;
    if(str.includes('è')) str = str.replaceAll('è', 'e');
    if(str.includes('é')) str = str.replaceAll('é', 'e');
    if(str.includes('ë')) str = str.replaceAll('ë', 'e');
    if(str.includes('ê')) str = str.replaceAll('ê', 'e');
    if(str.includes('â')) str = str.replaceAll('â', 'a');
    if(str.includes('ä')) str = str.replaceAll('ä', 'a');
    if(str.includes('ö')) str = str.replaceAll('ö', 'o');
    if(str.includes('ô')) str = str.replaceAll('ô', 'o');
    if(str.includes(')')) str = str.replaceAll(')', '');
    if(str.includes('(')) str = str.replaceAll('(', '');
    if(str.includes(' ')) str = str.replaceAll(' ', '-');
    if(str.includes('/')) str = str.replaceAll('/', '');
    if(str.includes('.')) str = str.replaceAll('.', '');
    if(str.includes('"')) str = str.replaceAll('"', '');
    if(str.includes("'")) str = str.replaceAll("'", '');
    if(str.startsWith('-')) str = str.replace('-', '');

    return str;
}

