'use strict';

// Load modules

const Hashids = require('hashids');

// Declare internals

const internals = {};

exports.register = function (server, options, next) {

    const alphabet = options.alphabet || null;
    const minHashLength = options.minHashLength || null;

    internals.hashids = new Hashids(options.salt, minHashLength, alphabet);
    server.expose(internals.hashids);

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
