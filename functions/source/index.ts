import * as functions from 'firebase-functions';
import axios from 'axios';

const cors = require('cors')({origin: true});

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const getCurrentStockPrice = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const response = await axios.get("https://finance.yahoo.com/quote/" + req.body.symbol + "/");
        var price = parseFloat(response.data.split("currentPrice")[1].split("fmt\":\"")[1].split("\"")[0].replace(',', ''));

        res.status(200).send({price});

    })
});


