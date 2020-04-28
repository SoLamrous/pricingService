const constants = require('./constant');

const items = constants.listOfPrices;

exports.getPrices = function (res, product_id, quantity, conversionRate) {
  if (quantity < 0) {
    return res.status(400).send({message: 'quantity should be positive'});
  }

  if (!conversionRate) {
    return res.status(400).send({message: 'invalid symbol'});
  }

  return items.filter(item => item.product_id === product_id)
  .map(function (item) {
        const vatRatio = constants.listOfVAT[item.vat_band];
        return {
          ...item,
          quantity,
          price: Number((item.price * conversionRate).toFixed(2)),
          total_price: Number((item.price * quantity * conversionRate).toFixed(2)),
          vat_value: Number((item.price
              * quantity
              * vatRatio
              * conversionRate).toFixed(2)),
          price_with_vat: Number(
              (item.price
                  * quantity
                  * (1 + constants.listOfVAT[item.vat_band])
                  * conversionRate).toFixed(2))
        }
      }
  )
};


