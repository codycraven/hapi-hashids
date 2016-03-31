'use strict';

const Hapi = require('hapi');


const server = new Hapi.Server();


server.register({
    register: require('hapi-hashids'),
    options: {
        salt: 'this is my salt'
    }
}, (err) => {

    if (err) {
        throw err;
    }
    const encoded = server.plugins['hapi-hashids'].encode(12345);
    const decoded = server.plugins['hapi-hashids'].decode(encoded);
    console.log('Encoded:', encoded);
    console.log('Decoded:', decoded);
});
