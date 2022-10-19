import './TransactionsArrayRow.css';
import TransactionsArrayElem from '../TransactionsArrayElem/TransactionsArrayElem';

export default function TransactionsArrayRow({type, className, values}){

    let divClassName = (type) ? getClassName(type) : "transactions-array-row";
    if(className){
        divClassName += " " + className;
    }
    let elements = (type !== 'tableHead') ? trimDatas(values) : null;

    return (
        <div className={divClassName}>

            {(type === "tableHead")? values.map((element, i) => <TransactionsArrayElem datas={element} key={`header-array-elem${i}`}/>) : elements.map((element, i) => <TransactionsArrayElem datas={element} key={`contacts-array-${i}`}/>)}

        </div>
    )
}


function getClassName(type){
    if(type === "tableHead"){
        return "transactions-array-row transactions-array-header";
    }
}

/**
 * Generates elements of the array row based on them context
 * @param {*} param0 
 * @returns {Array}
 */
function trimDatas({lastname, firstname, company, postCode, phone, email, presence}){
    const firstnameVal = (firstname) ? firstname : "";
    const lastnameVal = (lastname) ? lastname : "";
    const companyVal = (company) ? company : "";
    const postCodeVal = (postCode) ? postCode : "";
    const phoneVal = (phone) ? phone : "";
    const emailVal = (email) ? email : "";
    const presenceVal = (presence) ? `Oui` : `Non`;

    return[lastnameVal, firstnameVal, companyVal, postCodeVal, phoneVal, emailVal, presenceVal];
}