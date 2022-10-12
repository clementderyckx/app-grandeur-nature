import Utilities from "./Utilities";
class PhoneValidation {

    static addCountryCode(number, countryCode){
        const phoneNoPrefix = []
        for(let i = 1; i < number.length; i++){
            phoneNoPrefix.push(number[i]);
        }
        return (`${countryCode}${phoneNoPrefix.toString().replaceAll(',', '')}`);
    }

    static checkIfNum(number) {
        const numArr = number.split('');
        let isNum = true;
        numArr.forEach(character => {
            if (Number.isNaN(Number(character))){
                isNum = false;
            }
        })
        return isNum;
    }

    static validateNumber(number) {

        const numNoPrefix = [];
        let index = 0;
        if(number.startsWith('0')) {
            index = 1;
        } else if(number.startsWith('+')){
            index = 3;
        } else {
            return Utilities.response(false, "The argument is not a valid number");
        }
        for (let i = index; i < (number.length - index); i++){
            numNoPrefix.push(number[i]);
        }


        const result = {
            length: '',
            isNum: true,
        }

        numNoPrefix.forEach(character => {
            if (PhoneValidation.checkIfNum(character) === false){
                result.isNum = false;

            }
        })
        result.length = ((number.length - index) === 9);

        if(result.isNum === false){ return Utilities.response(false, "Specified number contains non numeric value(s)"); }
        else if(result.length === false){ return Utilities.response(false, "Specified number has different length"); }
        else { return Utilities.response(true, 'Specified number is valid.') }

    }
}


export default PhoneValidation;