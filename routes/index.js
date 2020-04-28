var express = require('express');
var router = express.Router();

var pricing = require('../model/pricing');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(pricing.getPrices(res, 1, 1));
  res.send(pricing.getPrices(res, 1, 1))
});

/* POST route */
router.post('/', function (req, res, next) {
  const items = req.body.order.items;
  const response = {
    items: [],
    total_price: 0,
    total_vat: 0,
    total_price_with_vat: 0
  };

  items.map(item =>
    pricing.getPrices(res, item.product_id, item.quantity).map(
      itemWithPrice => {
        response.items.push(itemWithPrice);
        response.total_price += itemWithPrice.total_price;
        response.total_vat += itemWithPrice.vat_value;
        response.total_price_with_vat += itemWithPrice.price_with_vat;
      })
  );
  res.send(response)
});

module.exports = router;
