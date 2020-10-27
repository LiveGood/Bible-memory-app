const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
require('dotenv').config();

//TODO: create express and hapi APIs that do the same work in order to compare the diffrence.
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database is running.!');
})

const server = Hapi.server({
    port: 3300,
    host: 'localhost'
});
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
        const cookie = request.state.myCookie;
        console.log(cookie);
        h.state('myCookie' , {greeted: true})
        return h.response('Hello World')
    }
})

server.state('myCookie', {
    ttl: null,
    isSecure: true,
    isHttpOnly: true,
    encoding: 'base64json',
    clearInvalid: false, // remove invalid cookies
    strictHeader: true // don't allow violations of RFC 6265
})

const init = async () => {
    await server.start();
    console.log('Hapi server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();