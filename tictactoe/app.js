'use strict';

//Filen app.js är den enda ni skall och tillåts skriva kod i.
'use strict';

const express = require('express');
const { JSDOM } = require('jsdom'); // Fixad rad
const cookieParser = require('cookie-parser');
const globalObject = require('./servermodules');
const fs = require('fs');
const http = require('http');

const app = express();

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end('Servern är igång');
});

server.listen(3000, () => {
    console.log('Servern är igång på port 3000!');
});
