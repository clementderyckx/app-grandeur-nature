const Utils = require(`${__dirname}/../classes/Utils.js`);
const Response = require(`${__dirname}/../classes/Response.js`);
const Contact = require(`${__dirname}/../classes/Contact.js`);

/**
 * Removes all contacts that have company in full Uppercase letters
 * @param {Array} contacts 
 * @param {Object} options 
 * @returns {Object}
 */
 function trimAllUppercase(contacts, options){
    const results = [];
    const allUpperCase = [];
    for(let contact of contacts){

        const isUpperCase = Utils.isUpperCase(contact.company);
        if(!isUpperCase){
            if(options && options.results){
                options.results.push(contact);
            }
            results.push(contact);
        } else {
            if(options && options.rejected){
                options.rejected.push(contact);
                allUpperCase.push(contact);
            }
            allUpperCase.push(contact);
        }
    }

    return { results: results, rejected: allUpperCase };
}

function spaceBetween(string){

    const isUpperCase = Utils.isUpperCase(string);
    let stringArr = "";
    let caractersBetween = "";
    if(isUpperCase){
        stringArr = string.split('DE');
        caractersBetween = 'DE ';
    } else {
        stringArr = string.split('de');
        caractersBetween = 'de '
    }

    if(stringArr.length === 1){
        stringArr = string.split("d'");
        caractersBetween = "d'"
    }

    if(stringArr.length === 1){
        stringArr = string.split("du");
        caractersBetween = "du "
    }
    if(stringArr.length === 1){
        stringArr = string.split("DU");
        caractersBetween = "DU ";
    }
    if(stringArr.length === 1){
        stringArr = string.split("ET");
        caractersBetween = "ET ";
    }

    if(stringArr.length > 1){
        const result = `${stringArr[0]} ${caractersBetween}${stringArr[1]}`;
        return new Response(200, 'contact has beeen trimed', result);
    } else {
        return new Response(400, 'Contact does not need to be trimmed', string);
    }
}

/**
 * Trim the specified character
 * @param {String} string 
 * @param {String} caractTarget 
 * @returns {Response}
 */
function trimCharacter(string, caractTarget){
    const stringArr = string.split(caractTarget);
    const result = [];

    if(stringArr.length > 1){
        stringArr.forEach(element => {
            if(element === ''){
                result.push(caractTarget);
            } else {
                result.push(element)
            }
        });

        return new Response(200, `${caractTarget} has been found and trimed`, result.join(' ')) ;
    }
    else {
        return new Response(400, 'Argument was not found', string) ;
    }
}

function trimServicesTechniques(string){
    const stringArr = string.split(' ');
    if(stringArr[0].startsWith("SERVICESTECHNIQUE")){
        const resultArr = ["SERVICES","TECHNIQUES"];
        for(let i = 1; i < stringArr.length; i++) {
            resultArr.push(stringArr[i]);
        }
        return new Response(200, 'Services techniques has been trimed', resultArr.join(' '))
    } else {
        return new Response(400, 'It was not a services techniques string', string)
    }
}


function trimEspacesVerts(string){
    const stringArr = string.split(' ');
    if(stringArr[0].startsWith("ESPACESVERTS")){
        const resultArr = ["ESPACES","VERTS"];
        for(let i = 1; i < stringArr.length; i++) {
            resultArr.push(stringArr[i]);
        }
        return new Response(200, 'Espaces Verts has been trimed', resultArr.join(' '))
    } else {
        return new Response(400, 'It was not a Espaces Verts string', string)
    }
}


function trimCommunauteAgglomeration(string){
    const stringArr = string.split(' ');
    if(stringArr[0].startsWith("COMMUNAUTEAGGLOMERATION")){
        const resultArr = ["COMMUNAUTE","AGGLOMERATION"];
        for(let i = 1; i < stringArr.length; i++) {
            resultArr.push(stringArr[i]);
        }
        return new Response(200, 'Communaute Agglomeration has been trimed', resultArr.join(' '))
    } else {
        return new Response(400, 'It was not a Communaute Agglomeration string', string)
    }
}

async function getNumberContacts(number){
    const allContacts = await Contact.find();
    const contacts =  [];
    const index = number - 1;
    for(let i = 0; i < index; i++){
        contacts.push(allContacts[i]);
    }
    return contacts;
}


module.exports = {
    trimAllUppercase: trimAllUppercase,
    spaceBetween: spaceBetween,
    trimServicesTechniques: trimServicesTechniques,
    trimEspacesVerts: trimEspacesVerts,
    trimCommunauteAgglomeration: trimCommunauteAgglomeration,
    trimCharacter: trimCharacter,
    getNumberContacts : getNumberContacts
};