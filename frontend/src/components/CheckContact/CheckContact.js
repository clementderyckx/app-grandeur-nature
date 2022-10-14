import './CheckContact.css';
import { useEffect, useState } from 'react';
import { ReactComponent as LogoSocodip } from './../../imgs/logo-socodip2021.svg';
import { ReactComponent as LogoGrandeurNature } from './../../imgs/logo-grandeur-nature.svg';
import ContactShow from '../ContactShow/ContactShow';
const apiUrl = 'https://app-salon-socodip.herokuapp.com';

export default function CheckContact(){

    const [contact, updateContact] = useState({});
    const [className, updateClassName] = useState("response-banner");
    const [responseText, updateResponseText] = useState("");
    const [contentClassName, updateContentClassName] = useState("content");
    // AJOUTER DU STATE POUR LA REPONSE
    const id = getID();

    const trimResponse = (response) => {
        const {status, message, result} = response;
        const className = getClassNames(status, result);
        const text = getResponseText(status, result);

        updateClassName(className);
        updateResponseText(text);

        if(status === 200){
            updateContact(result);
        } else if (status === 400 || status === 404){
            updateContentClassName("content full-height")
        } else {
            updateContentClassName("content full-height")
        }
    }


    const fetchUser = () => {
        // fetch(`http://localhost:4009/salon/pass/${id}`)
        fetch(`${apiUrl}/salon/pass/${id}`)
        .then(res => res.json())
        .then(response => { trimResponse(response) })
        .then(() => window.setTimeout(() => window.location.href = 'http://localhost:3000/qrcode-scanner', 2000))
        .catch(err => window.setTimeout(() => window.location.href = 'http://localhost:3000/qrcode-scanner', 2000))
    }

    useEffect(() => {
        fetchUser();
    }, [])



    return (
        <div className="check-contact">
            <header className="header">
                <div className="logo-header">{<LogoSocodip />}</div>
            </header>

            <div className={contentClassName}>
                <div className={className}>
                    <div className="response-title">
                        {responseText}
                    </div>
                </div>

                <ContactShow contact={contact}/>


            </div>

            <footer className="footer">
                <div className="logo-footer"><LogoGrandeurNature/></div>
            </footer>

            {/* <div className="overlay"></div> */}
            
        </div>
    )
}

function getID () {
    const urlArray = window.location.href.split('/')
    return urlArray[ urlArray.length - 1 ]
}

function getClassNames(status, result){
    const base = "response-banner";
    let add = "";
    if(status === 400 || status === 404){
        return `${base} error`;
    } else if (status === 200){
        if(result.badgeCount && result.badgeCount > 1){
            add = "danger";
        } else {
            add = "success";
        }
    }
    return (add.length > 0) ? `${base} ${add}` : base;
}

function getResponseText(status, result){
    let response = "";
    if(status === 400 || status === 404){
        return <h1 className="response-text"><span>Contact non-inscrit au salon.</span> <span>Rediriger vers l’accueil pour inscription</span></h1>
    } else if (status === 200){
        if(result.badgeCount && result.badgeCount > 1){
            response = "Contact déja badgé";
        } else {
            response = "Contact inscrit au salon";
        }
    }
    return <h1 className="response-text">{response}</h1>;
}