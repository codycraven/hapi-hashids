# hapi-hashids

-------

[Hapi.js](http://hapijs.com/) plugin wrapper for [hashids](https://github.com/ivanakimov/hashids.node.js).

[![Build Status](https://secure.travis-ci.org/codycraven/hapi-hashids.svg)](http://travis-ci.org/codycraven/hapi-hashids)

Installation
-------

1. In your [Hapi.js project](http://hapijs.com/tutorials) install hapi-hashids:
   ```
   npm install --save hapi-hashids
   ```
2. Register the plugin with your `server` object:
   ```javascript
   server.register({
       register: require('hapi-hashids'),
       options: {
           salt: 'this is my salt',
           minHashLength: 0, // Optional
           alphabet: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', // Optional
       }
   }, (err) => {

       if (err) {
           throw err; // Something bad happened
       }
       // Your code
   });
   ```

Usage
-------

Once hapi-hashids are registered with your server, you can make use of them anywhere the server object is accessible (such as request handlers - `request.server`).

All examples below are from the Node.js hashids git repo, but are using the Hapi plugin attached to the `server` object.

**Configuration:**
* The `salt` used is: **this is my salt**. 
* `minHashLength` and `alphabet` were unspecified to use their defaults, unless otherwise stated.

#### Encoding one number

```javascript
server.plugins['hapi-hashids'].encode(12345); // NkK9
```

#### Decoding

```javascript
server.plugins['hapi-hashids'].decode('NkK9'); // [ 12345 ]
```

#### Decoding with different salt

Decoding will not work if the salt is changed:
```javascript
server.plugins['hapi-hashids'].decode('NkK9'); // []
```

#### Encoding several numbers

```javascript
server.plugins['hapi-hashids'].encode(683, 94108, 123, 5); // aBMswoO2UB3Sj
```

Or pass as an array:

```javascript
const arr = [683, 94108, 123, 5]
server.plugins['hapi-hashids'].encode(arr); // aBMswoO2UB3Sj
```

#### Decoding into several numbers

```javascript
server.plugins['hapi-hashids'].decode('aBMswoO2UB3Sj'); // [ 683, 94108, 123, 5 ]
```

#### Using minHashLength

We set the minimum id length to **8** (by default it is **0** -- meaning ids will be the shortest possible length).

```javascript
server.register({
    register: require('hapi-hashids'),
        options: {
            salt: 'this is my salt',
            minHashLength: 0,
        }
    }, (err) => {

        if (err) {
            throw err; // Something bad happened
        }
        // This call could be anywhere in the application, as long as server is accessible.
        server.plugins['hapi-hashids'].encode(1); // gB0NV05e
        server.plugins['hapi-hashids'].decode('gB0NV05e'); // [ 1 ]
   });
```

#### Specifying custom alphabet

Here we set the alphabet to consist of valid hex characters: **0123456789abcdef**

```javascript
server.register({
    register: require('hapi-hashids'),
        options: {
            salt: 'this is my salt',
            alphabet: '0123456789abcdef',
        }
    }, (err) => {

        if (err) {
            throw err; // Something bad happened
        }
        // This call could be anywhere in the application, as long as server is accessible.
        server.plugins['hapi-hashids'].encode(1234567); // b332db5
        server.plugins['hapi-hashids'].decode('b332db5'); // [ 1234567 ]
   });
```

#### Hex encoding/decoding

Hashids also support encoding and decoding of hex values, not only integers:

```javascript
server.plugins['hapi-hashids'].encodeHex('507f191e810c19729de860ea'); // yNyaoWeKWVINWqvaM9bw
server.plugins['hapi-hashids'].decodeHex('yNyaoWeKWVINWqvaM9bw'); // 507f191e810c19729de860ea
```

Security notice
-------
Hashids are used when you do not want to expose integer ids to the user. They should not be used for security purposes and are only meant as an algorithm to obfuscate numbers to give YouTube and Bit.ly style identifiers.

Read more on the official [documentation page](http://hashids.org/node-js/).
