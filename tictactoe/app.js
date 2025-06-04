'use strict';

//Filen app.js är den enda ni skall och tillåts skriva kod i.
'use strict';

const express = require('express');
const { JSDOM } = require('jsdom'); // Fixad rad
const cookieParser = require('cookie-parser');
const globalObject = require('./servermodules/game-modul');
const fs = require('fs');
const http = require('http');
const { error } = require('console');

const app = express();


const server = http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end('Servern är igång');
});

server.listen(3000, () => {
    console.log('Servern är igång på port 3000!');
});

app.use('/openDir', express.static(__dirname + '/static'));
app.use(express.urlencoded( {extended : true} ));
app.use(cookieParser());

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/static/html/index.html', (err) => {
        if (err) {
            console.error(err);
            // Avoid sending headers twice if headers already sent
            if (!response.headersSent) {
                response.status(500).send('Ett fel uppstod vid hämtning av sidan.');
            }
        } else {
            console.log('Index-sidan skickades korrekt.');
        }
    });
});

app.get('/reset', (req, res) => {

});

app.post('/', (request, response) => {
    console.log("Post anrop på '/' mottaget.");
    console.log("inkommande data", request.body);
    try {
        // Spelare 1
        const nick_1 = globalObject.playerOneNick;
        const color_1 = globalObject.playerOneColor;
        if (nick_1 === null) {
            console.log("spelare 1 saknas!");
            throw error("Nickname saknas!");
        } else {
            console.log("spelare 1 har valt ett nickname");
        }

        if (nick_1.length < 3) {
            console.log("Nick name innehåller färre än 3 tecken");
            throw error("Nickname ska vara minst tre tecken långt!");
        } else {
            console.log("spelare 1 har ett lösen som är mer eller lika med 3 tecken");
        }

        if (color_1 === undefined) {
            console.log("spelare ett har ej valt en färg");
            throw error("färg saknas");
        } else {
            console.log("färg är inlagd");
        }
        if (color_1.length !== 7) {
            console.log("färgen är inte 7 tecken lång");
            throw error("Färgen måste vara 7 tecken lång!");
        } else {
            console.log("färgen är 7 tecken lång");
        }

        if (color_1 === "#000000" || color_1 === "#FFFFFF") {
            console.log("spelare 1 har valt en ogiltig färg");
            throw error("Färgen kan inte vara svart eller vit!");
        }

        // Spelare 2
        const nick_2 = globalObject.playerTwoNick;
        const color_2 = globalObject.playerTwoColor;
        if (nick_2 === null) {
            console.log("spelare 2 saknas!");
            throw error("Nickname saknas för spelare 2!");
        } else {
            console.log("spelare 2 har valt ett nickname");
        }

        if (nick_2.length < 3) {
            console.log("Nick name för spelare 2 innehåller färre än 3 tecken");
            throw error("Nickname för spelare 2 ska vara minst tre tecken långt!");
        } else {
            console.log("spelare 2 har ett lösen som är mer eller lika med 3 tecken");
        }

        if (color_2 === undefined) {
            console.log("spelare två har ej valt en färg");
            throw error("färg saknas för spelare 2");
        } else {
            console.log("färg är inlagd för spelare 2");
        }
        if (color_2.length !== 7) {
            console.log("färgen för spelare 2 är inte 7 tecken lång");
            throw error("Färgen för spelare 2 måste vara 7 tecken lång!");
        } else {
            console.log("färgen för spelare 2 är 7 tecken lång");
        }

        if (color_2 === "#000000" || color_2 === "#FFFFFF") {
            console.log("spelare 2 har valt en ogiltig färg");
            throw error("Färgen för spelare 2 kan inte vara svart eller vit!");
        }

        if(nick_1 === nick_2) {
            console.log('spelare 1 och spelare 2 har samma namn')
            throw error("spelare1 och spelare 2 kan ej använda samma  nick name");
        } else {
            console.log("spelare 1 och spelae2 har olka nick");        
        }

        if(color_1 === color_2) {
            throw error ("kan ej använda samma färg, vänligen välj olika färger");
        } else {console.log("spelare 1 och två har olika färger");}

        if(color_1 !== color_2 && nick_1 !== nick_2) {
            res.cookie()
        }

        

        
    } catch (err) {
        console.error("undantag fångats:", err.message);
        response.status(400).send(err.message);
    }
    




});

