const constants = require('./constant');

exports.getPrices = function (res, product_id, quantity) {
  if (quantity < 0) {
    return res.status(400).send({message: 'This is an error!'});
  }
  const items = constants.listOfPrices;
  return items.filter(item => item.product_id === product_id)
  .map(function (item) {
        const vatRatio = constants.listOfVAT[item.vat_band]
        return {
          ...item,
          quantity,
          total_price: Math.round((item.price * quantity) * 100) / 100,
          vat_value: Math.round((item.price
              * quantity
              * vatRatio) * 100) / 100,
          price_with_vat: Math.round(
              item.price
              * quantity
              * (1 + constants.listOfVAT[item.vat_band])
              * 100) / 100
        }
      }
  )

};


