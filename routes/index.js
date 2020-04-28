var express = require('express');
var router = express.Router();
const https = require('https');

var pricing = require('../model/pricing');

/* POST route */
router.post('/', function (req, res, next) {
  const items = req.body.order.items;
  const symbol = req.body.symbol;
  const response = {
    items: [],
    total_price: 0,
    total_vat: 0,
    total_price_with_vat: 0
  };

  https.get('https://api.exchangeratesapi.io/latest?base=GBP',
      (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end', () => {
              const conversionRate = symbol ? JSON.parse(data).rates[symbol] : 1;
              items.map(
                  item => pricing.getPrices(res, item.product_id, item.quantity,
                      conversionRate)
                  .map(
                      itemWithPrice => {
                        response.items.push(itemWithPrice);
                        response.total_price += itemWithPrice.total_price;
                        response.total_vat += itemWithPrice.vat_value;
                        response.total_price_with_vat +=
                            itemWithPrice.price_with_vat;
                      }));
              response.total_price = Number(response.total_price.toFixed(2));
              response.total_vat = Number(response.total_vat.toFixed(2));
              response.total_price_with_vat = Number(
                  response.total_price_with_vat.toFixed(2));
              res.send(response)
            }
        );
      }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});

module.exports = router;
