import MailToLink from "../../HTML/MailToLink";
import TelToLink from "../../HTML/TelToLink";
import React from "react";
import contacts from "../../../datas/contacts";
// Stylesheet
import './submitValidationMessage.css';
function getValidationTitle(content){
    return <h2 className="submit-validation-title">{content}</h2>
}

function Signature({submitted}){
    return (
        <span className="submit-validation-signature">
            Cordialement, <br/>
            L'équipe Socodip
        </span>
    )

}

function SubmitValidationMessage({submitted, error, response}){
    let message = "";
    let title = "";
    let signature = ""

    if(submitted === true){
        title = getValidationTitle('Votre inscription a bien été prise en compte');
        message = (
            <p className="submit-validation-message">Madame, Monsieur, <br/>
            Vous recevrez sous peu par mail votre badge d’entrée, n’oubliez pas de l’IMPRIMER ! <br/>
            Toute l’équipe est impatiente de vous retrouver le Jeudi 15 septembre dès 8h30 à Gauchy <br/>
            RDV au Complexe Sportif Robert Barran , Parc Jean Bouin, Rue De Picardie, Gauchy 02430 <br/>
            Le site étant en pleine nature, n’oubliez de prendre des chaussures adéquates ! <br/>
            Pour tous renseignements complémentaires, vous pouvez nous joindre au <TelToLink phone={contacts.socodip.tel}/></p>
        )
        signature = <Signature />;


    } else if(response === 400) {
        title = getValidationTitle("Le contact est déjà inscrit au salon");
        message = <p className="submit-validation-message">Une erreur est survenue car le contact est déja inscrit au salon. Pour recevoir des informations concernant le salon, vous pouvez nous joindre au <TelToLink phone={contacts.socodip.tel} /> ou par mail <MailToLink mail={contacts.socodip.mail}/> </p>
        signature = <Signature />;

    } else if(submitted === false && error === 1){
        message = <p>Une erreur est survenue lors de votre inscription au salon. Merci de bien vouloir resoumettre votre formulaire</p>
        signature = <Signature />;

    }

    return (
        <div className="submit-validation">
            {title}
            {message}
            {signature}
        </div>
    );
}

export default SubmitValidationMessage;