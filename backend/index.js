if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();
const db = require(`${__dirname}/lib/db/db`);
const port = process.env.PORT || 4009;

// Router Imports
const contactsRouter = require(`${__dirname}/router/contactsRouter.js`);
const exportsRouter = require(`${__dirname}/router/exportRouter.js`);
const passRouter = require(`${__dirname}/router/passRouter.js`);
const rootRouter = require(`${__dirname}/router/rootRouter.js`);
const utilitiesRouter = require(`${__dirname}/router/utilitiesRouter.js`);
const satisfactionRouter = require(`${__dirname}/router/satisfactionRouter.js`);

db.connect({ source: 'prod' });
// db.connect({ source: 'local' });

// App Config
app.use( express.json() );
app.use( express.urlencoded() );
app.use( cors() );
app.use( fileUpload() );
app.use( '/files', express.static(`${__dirname}/files`) );
app.use( '/static', express.static(`${__dirname}/docs`) );

// Router declarations
app.use( '/', rootRouter );
app.use( '/salon/contacts', contactsRouter );
app.use( '/salon/satisfaction', satisfactionRouter );
app.use( '/exports', exportsRouter );
app.use( '/salon/pass', passRouter );
app.use( '/utilities', utilitiesRouter );


app.listen(port, () => console.log(`Listening on port : ${port}`));
