'use strict';

// Load modules

const Code = require('code');
const Hapi = require('hapi');
const Hashids = require('..');
const Lab = require('lab');


// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('Hashids', () => {

    it('encodes and decodes an integer', (done) => {

        const server = new Hapi.Server();
        server.connection();

        server.register({
            register: Hashids,
            options: {
                salt: 'this is my salt',
            }
        }, (err) => {

            if (err) {
                throw err;
            }
            const integer = 12345;
            const encode = server.plugins['hapi-hashids'].encode(integer);
            expect(encode).to.equal('NkK9');
            const decode = server.plugins['hapi-hashids'].decode(encode);
            expect(decode).to.only.include([integer]);
            done();
        });
    });

    it('encodes and decodes multiple integers', (done) => {

        const server = new Hapi.Server();
        server.connection();

        server.register({
            register: Hashids,
            options: {
                salt: 'this is my salt',
            }
        }, (err) => {


            if (err) {
                throw err;
            }
            const arr = [683, 94108, 123, 5];
            const encode = server.plugins['hapi-hashids'].encode(arr);
            expect(encode).to.equal('aBMswoO2UB3Sj');
            const decode = server.plugins['hapi-hashids'].decode(encode);
            expect(decode).to.only.include(arr);
            done();
        });
    });
});
