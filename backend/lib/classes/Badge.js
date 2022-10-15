if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: `${__dirname}/../../.env`});
}
const puppeteer = require("puppeteer");
const fs = require('fs');
const Utils = require('./Utils.js');
class Badge{

    constructor({contact}) {
        this.id = contact.id;
        this.company = contact.company;
        this.firstname = contact.lastname;
        this.lastname = contact.firstname;
        this.email = contact.email;

        this.fileName = `badge_${Utils.clearString(contact.company).toLowerCase()}_${Utils.clearString(contact.lastname).toLowerCase()}_${Utils.clearString(contact.firstname).toLowerCase()}.pdf`;
        this.localUrl = `${__dirname}/../../files/badges/${this.fileName}`;
        this.url = `${process.env.FILEAPI}/salon-gauchy/badges/${this.fileName}`;
    }


    /**
     * Generates the pdf badge for the contact and save it locally
     * @param {page} puppeteerPage
     */
    async generateBadge(puppeteerPage) {

        if(!fs.existsSync(`${__dirname}/../../files/badges/`)){
            fs.mkdirSync(`${__dirname}/../../files/badges/`)
        }

        try {
            let browser = "";
            if(!puppeteerPage){
                browser = await puppeteer.launch();
            }
            const page = (puppeteerPage) ? puppeteerPage : await browser.newPage();
            await page.setViewport({width: 1920, height: 860});

            const staticApiUrl = `${process.env.LOCALAPPURL}/static`;
            await page.goto(`${staticApiUrl}/html/badge.html?id=${this.id}`, {waitUntil: 'networkidle2'});
            console.log(`Generating Badge for ${this.firstname} ${this.lastname}...`);

            await page.waitForTimeout(1000);

            console.log('Saving badge...');
            await page.pdf({
                path: `${this.localUrl}`,
                format: 'A4',
            })
            console.log('Badge saved !');

            if(!puppeteerPage){
                await browser.close();
            }


            this.hasBeenGenerated = true;
        } catch(err){
            this.hasBeenGenerated = false;
            console.log(err);
        }

        return this;


    }

}

module.exports = Badge;