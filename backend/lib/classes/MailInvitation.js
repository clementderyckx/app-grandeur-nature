if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: `${__dirname}/../../.env`});
}
const SibApiV3Sdk = require('sib-api-v3-sdk');


class MailInvitation {

    constructor( contact, config ) {
        this.contact = contact;
        this.badgeUrl = (config && config.badgeUrl) ? config.badgeUrl : '';
    }

    /**
     * Connects to the SIB API
     */
    connectToApi(){
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        const sibApiKey = process.env.SIB_API;
        // Configure API key authorization: api-key
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = sibApiKey
        const partnerKey = defaultClient.authentications['partner-key'];
        partnerKey.apiKey = sibApiKey
    }

    /**
     * Send the badge to the contact it is construct around
     */
    async sendBadgeByMail(){
        this.connectToApi();
        const mailApi = new SibApiV3Sdk.TransactionalEmailsApi();
        const mail = `Bonjour ${this.contact.firstname},
    
                    Vous trouverez ci-joint votre badge d’accès au Salon Grandeur Nature à Gauchy le 15 septembre 2022
    
                    N’oubliez pas de le prendre avec vous pour pouvoir accéder à notre salon.
                    RDV au complexe sportif Barran – Parc Jean Bouin, rue de Picardie, 02430 GAUCHY dès 8h30.
    
    
    
                    Cordialement,
    
                    Clément
                    Développeur WEB
                    S.A.S SOCODIP
                    03.28.43.16.16`;
    
        const smtpMail = {
            sender: {name: 'Clément DERYCKX', email: "clement.deryckx@outlook.com"},
            to: [{ name: `${this.contact.lastname} ${this.contact.firstname}`, email: this.contact.email }],
            subject: "Votre badge d'entrée salon Grandeur Nature",
            textContent : mail,
            attachment: [{url:  `${this.badgeUrl}`}],
        }
    
        const result = await mailApi.sendTransacEmail(smtpMail);
        return result
    }


    /**
     * Sends the subscription confirmation email to the client
     */
    sendMail(){
        console.log(this)
        this.connectToApi();
        const mailApi = new SibApiV3Sdk.TransactionalEmailsApi();
        const mail = `Bonjour,
        
                    Votre inscription au Salon Grandeur Nature à Gauchy le 15 septembre 2022 a bien été prise en compte.
 
                    Vous recevrez sous peu votre badge d’accès qui sera à imprimer et présenter à l'entrée le jour de l'évenement.
                     
                    Pour tout information complémentaire, vous ppouvez nous joindre par téléphone au 03.28.43.16.16 ou par mail à l'adresse info@socodip.fr
                     
                    Cordialement,
                     
                    Clément
                    Développeur WEB
                    S.A.S SOCODIP
                    03.28.43.16.16`;

        const smtpMail = {
            sender: {name: 'Clément DERYCKX', email: "clement.deryckx@outlook.com"},
            to: [{ name: `${this.contact.lastname} ${this.contact.firstname}`, email: this.contact.email }],
            subject: "Votre inscription au salon a bien été prise en compte",
            textContent : mail,
        }


        mailApi.sendTransacEmail(smtpMail).then((result) => console.log(result)).catch((e) => console.log(e.message))
    }


}

module.exports = MailInvitation;
