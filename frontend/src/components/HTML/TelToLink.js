import React from 'react';
function phoneNoFrPrefix(phone){
    const phoneArr = phone.split('');
    const newPhone = ["0"];
    let space = 1;
    for (let i = 3; i < phoneArr.length; i++) {
        if(space === 2){
            newPhone.push(' ');
            space = 0;
        }
        newPhone.push(phoneArr[i]);
        space ++;
    }
    return newPhone.toString().replaceAll(',', '');
}

function TelToLink ({phone}){
    const telTo = `tel:${phone}`
    return <a href={telTo}>{phoneNoFrPrefix(phone)}</a>
}

export default TelToLink;