'use strict';

const Hapi = require('hapi');


const server = new Hapi.Server();


server.register({
    register: require('hapi-hashids'),
    options: {
        salt: 'this is my salt',
        // minHashLength: 8,
        // alphabet: 'abcdef0123456789',
    },
}, (err) => {

    if (err) {
        throw err;
    }
    const encoded = server.plugins['hapi-hashids'].encode(12345);
    const decoded = server.plugins['hapi-hashids'].decode(encoded);
    console.log('Encoded:', encoded);
    console.log('Decoded:', decoded);
});
