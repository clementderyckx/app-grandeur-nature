// Comment on node
import Utilities from "./Utilities";
import PhoneValidation from "./PhoneValidation";
/* Uncomment on node
const Utilities = require('./Utilities');
 */

class ValidationForm{

    /**
     * Removes all the validation messages in the DOM from this library (span with class started by validation-message)
     * @param inputs
     */
    static cleanInputsMessages(inputs){
        inputs.forEach(input => {
            if(input.parentElement.querySelector('span[class^="validation-message"]')){
                input.parentElement.querySelector('span[class^="validation-message"]').remove();
            }
        })
    };

    /**
     * Return an HTML Element formatted
     * @param specs {{type, message}}
     * @returns {HTMLSpanElement}
     */
    static createValidationMessage(specs){
        const element = document.createElement('span');
        element.className = `validation-message-${specs.type}`;
        element.innerText = specs.message;
        return element;
    }

    static checkIfEmpty(input) {
        return (input.value.length === 0);
    }

    /**
     * Checks if an input in not empty, otherwise, push an error in the errors Array passed in params
     * @param input {HTMLInputElement}
     * @param errors {Array}
     * @returns {boolean}
     */
    static noEmptyInput(input, errors){
        if(this.checkIfEmpty(input)){
            errors.push(Utilities.error(input, 'Merci de spécifier une valeur'));
            return false
        } else {
            return true;
        }
    }

    /**
     * Checks if an input element contains only numeric character.
     * If options.stats is set to true, return an object containing result as result.result and stats at results.stats
     * @param input {HTMLInputElement}
     * @param options {Object || null}
     * @returns {boolean}
     */
    static checkIfNum(input, options){
        const arr = input.value.split('');
        const result = {
            result: true,
            stats: {
                num: 0,
                others: 0
            }

        }
        arr.forEach(elem => {
            if(isNaN(Number(elem))){
                result.others ++;
                result.result = false;
            } else {
                result.num ++;
            }
        })

        return (options && options.stats === true) ? result : result.result;
    }

    /**
     * Checks if an input has a numeric only value, otherwise, generates an error in the array
     * @param input
     * @param errors
     * @returns {boolean}
     */
    static numOnlyInput(input, errors){
        if(this.checkIfNum(input, {stats: false}) === false){
            errors.push(Utilities.error(input, "Ce champs n'accepte que des nombres"));
            return false
        } else {
            return true
        }
    }

    /**
     * Checks if the input values contains only numeric character. If it does, checks if values is long exactly 5 characters long.
     * @param input {HTMLInputElement}
     * @returns {boolean|boolean}
     */
    static isPostCode(input){
        const isNum = this.checkIfNum(input, {stats: false});
        return (isNum) ? input.value.length === 5 : false;
    }

    /**
     * Checks if the input values contains only numeric character and long as exactly 5 characters. if false, push an error in the errors array
     * @param input {HTMLInputElement}
     * @param errors {Array}
     * @returns {boolean}
     */
    static postCodeOnly(input, errors){
        if (this.isPostCode(input)){
            return true
        } else {
            if(this.hasError(input, errors) === false) errors.push(Utilities.error(input, "Veuillez spécifier un code postal valide"));
            return false
        }
    }

    /**
     *
     * @param nbCarachters: {String}
     * @param input: {Element}
     * @returns {Error|boolean}
     */
    static minCharacters(nbCharacters, input){
        const result = (input.value.length < nbCharacters) ? Utilities.error(input, `La valeure spécifiée doit contenir au moins ${nbCharacters} caractères`) : false;
        return result;
    }

    /**
     * Checks if the errors array already contains error in the errors array
     * @param input
     * @param errors
     * @returns {boolean}
     */
    static hasError(input, errors){
        let i = 0;
        errors.forEach(error => { if(error.input === input.name) i++; });
        return (i > 0);
    }

    /**
     * Checks if the specified input contains a value with minimum nbCharacters, otherwise it generates an error in the errors array passed in params
     * @param nbCharacters
     * @param input
     * @param errors
     * @returns {{message, status}}
     */
    static minCharactersInput(nbCharacters, input, errors){
        const minResult = this.minCharacters(nbCharacters, input);
        if(minResult !== false) {
            if(this.hasError(input, errors) === false) errors.push(minResult);
            return Utilities.response(true, `An error message has been generated for input ${input.name}`);
        } else {
            return Utilities.response(false, `${input.name} matches the minimum of ${nbCharacters} characters required`);
        }
    }

    /**
     * Checks if the input is matching email format
     * @param input
     * @returns {boolean}
     */
    static validEmail(input){
        const mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return mailRegex.test(input.value);
    }

    /**
     * Checks if the specified input contains a valid email value, otherwise it generates an error in the errors array passed in params
     * @param input {Element}
     * @param errors {Array}
     * @returns {{message, status}}
     */
    static validEmailInput(input, errors){
        const isValid = this.validEmail(input);
        if(isValid){
            return Utilities.response(isValid, "The typed email is correct");
        } else {
            if(this.hasError(input, errors) === false) errors.push(Utilities.error(input, "La valeur doit être un email valide"));
            return Utilities.response(isValid, `An error message has been catch for non matching regex ${input.name}`);
        }
    }

    static validPhoneInput(input, errors){
        const isValid = PhoneValidation.validateNumber(input.value);
        if(isValid.status){
            return isValid;
        } else {
            if(this.hasError(input,errors) === false) errors.push(Utilities.error(input, "La valeur doit être un numéro de téléphone valide"));
            return isValid;
        }
    }

}

// Comment on node
export default ValidationForm;
/* Uncomment on node
module.exports = ValidationForm
 */
