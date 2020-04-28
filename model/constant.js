const fs = require('fs');

const rawJSON = fs.readFileSync('model/pricing.js');
const pricesAndVAT = require('./pricing.json');
const listOfPrices = pricesAndVAT.prices;
const listOfVAT = pricesAndVAT.vat_bands;

module.exports = Object.freeze({
  listOfPrices: listOfPrices,
  listOfVAT: listOfVAT
});
