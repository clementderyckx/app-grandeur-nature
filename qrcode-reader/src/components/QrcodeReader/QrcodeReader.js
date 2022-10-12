import './QrcodeReader.css';
import { Html5Qrcode } from "html5-qrcode";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function QrcodeReader() {


    const onScanSuccess = (decodedText, decodedResult) => {

        if(!decodedText.startsWith('http') || !decodedText.startsWith('https')){
            alert("Le QrCode ne contient pas d'url, contenu : " + decodedText);
        } else {
            const isValid = validateUrl(decodedText);
            if(isValid === true) {
                const id = getIdFromUrl(decodedText);
                window.location.href = `https://scanner.socodip.fr/check-contact/${id}`;
                // window.location.href = `https://qrcode-scanner-gauchy.herokuapp.com/check-contact/${id}`;
                // window.location.href = `http://localhost:3000/check-contact/${id}`;
            } else {
                window.location.href = `https://scanner.socodip.fr/check-contact/ab12cd34ab12cd34ab12cd34`;
                // window.location.href = `https://qrcode-scanner-gauchy.herokuapp.com/check-contact/ab12cd34ab12cd34ab12cd34`;
                // window.location.href = `http://localhost:3000/check-contact/ab12cd34ab12cd34ab12cd34`;
            }
        }

    }

    const qrcodeConfig = { fps: 10, qrbox: { width:250, height:250 } };
    useEffect(() => {
        const html5Qrcode = new Html5Qrcode("reader");
        Html5Qrcode.getCameras().then(devices => {
            if(devices && devices.length){
                html5Qrcode.start( {facingMode: "environment"}, qrcodeConfig, onScanSuccess ).catch(err => window.alert(err))
            }
        })   
    })




    return (
        <div className="qrcode-reader">
            <div id="reader">

            </div>
        </div>
    )
}

// Security function to validate url scanned is from the app and corrects old API URL to new API URL
/**
 * 
 * @param {*} url 
 */
function validateUrl(url){
    const apiUrls = ['https://qrcode-checklist.herokuapp.com/salon/contacts/check/','https://qrcode-checklist.herokuapp.com/contact/check/','https://qrcode-checklist.herokuapp.com/check/','https://qrcode-checklist.herokuapp.com/contacts/check/', 'https://qrcode-checklist.herokuapp.com//salon/pass/','https://salon-gauchy.herokuapp.com/salon/pass/', 'https://salon-gauchy.herokuapp.com//salon/pass/'];
    let isValid = false;
    for(let apiUrl of apiUrls){
        if(url.startsWith(apiUrl)){
            // window.alert(' ca matche baby !!! \n' + apiUrl + ' - ' + url)
            isValid = true
        }
    }

    return isValid
    
}

/**
 * Gets user id from API URL
 * @param {String} url 
 * @returns {String} id
 */
function getIdFromUrl (url){
    const urlArray = url.split('/');
    return urlArray[ urlArray.length - 1 ];
}

function onScanFailure(){

}