require('dotenv').config({path: __dirname+'/../../.env'});
const mongoose = require("mongoose");
function connect({ source }){
    if(!source || source === "prod"){
        mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => console.log('Connected')).catch((e) => console.log(`Not connected : ${e}`));
    } else if(source === "local"){
        mongoose.connect(process.env.MONGODBLOCAL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => console.log('Connected to local db')).catch((e) => console.log(`Not connected : ${e}`));
    } 
}

module.exports = {
    connect: connect
}