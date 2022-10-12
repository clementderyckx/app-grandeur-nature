require('dotenv').config({path: `${__dirname}/../../.env`});
const fs = require('fs');
const QRcode = require('qrcode-svg');
const Utils = require('./Utils');
class QrCode {
    constructor(options) {
        this.id = options.id;
        this.url = `${process.env.NEWAPPURL}/salon/pass/${options.id}`;
        this.filesDir = `${__dirname}/../../docs/files`;

        this.recipient = {
            lastname: Utils.clearString(options.lastname).toLowerCase() ,
            firstname: Utils.clearString(options.firstname).toLowerCase(),
            company: (options.company) ? Utils.clearString(options.company).toLowerCase() : "",
        };

        this.fileName = `${this.recipient.company}-${this.recipient.lastname}-${this.recipient.firstname}.svg`;
        this.filePath = `${this.filesDir}/qrcodes/${this.fileName}`;
    }

    
    async generate(){
        if(!fs.existsSync(`${__dirname}/../../docs/files`)){
            fs.mkdirSync(`${__dirname}/../../docs/files`);
            fs.mkdirSync(`${__dirname}/../../docs/files/qrcodes`);
            fs.mkdirSync(`${__dirname}/../../docs/files/badges`);
        } else if(!fs.existsSync(`${__dirname}/../../docs/files/qrcodes`)){
            fs.mkdirSync(`${__dirname}/../../docs/files/qrcodes`);
        } else if(!fs.existsSync(`${__dirname}/../../docs/files/badges`)){
            fs.mkdirSync(`${__dirname}/../../docs/files/badges`);
        }
        const qrCode = new QRcode({
            content: `${this.url}`,
            width: 256,
            height: 256,
            color: '#000000',
            background: "#ffffff",
        });
        if(fs.existsSync(this.filesDir) === false) {
            fs.mkdirSync(this.filesDir)
            fs.mkdirSync(`${this.filesDir}/qrcodes`)
            fs.mkdirSync(`${this.filesDir}/badges`)
        };
        qrCode.save(this.filePath, ( error ) => {
            (error) ? console.log(error.message) : console.log(`A QrCode has been generated for user -> ${this.recipient.firstname} ${this.recipient.lastname}`);
        } );

        return this;
    }
}

module.exports = QrCode;