# Pricing Service

## Data
model/pricing.json contains the prices of each items and the value of vat bands.

The items prices are stored without vat.

## Running the app
You need to have node and npm installed

- Run `npm install` to install the node modules
- Run `npm start` to start the app

The app will be running on the port `3000` by default.

Example of request:
```
curl --location --request POST 'http://localhost:3000/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "order": {
        "id": 12345,
        "customer": {},
        "items": [
            {
                "product_id": 1,
                "quantity": 1
            },
            {
                "product_id": 2,
                "quantity": 5
            },
            {
                "product_id": 3,
                "quantity": 1
            }
        ]
    },
    "symbol": "EUR"
}'
```

`symbol` field can be empty. If it's empty the request will return the prices in GBP. 
This api https://api.exchangeratesapi.io/ is used to get the current rate.

## Test
Run `npm test` to launch the tests
2 Tests that test the POST endpoint in integration
- without field `symbol`
- with field `symbol`

## Improvements

### Improve the code
- Make sure that the items in the input payload is grouped by product_id. Add a layer that performs that kind of operations (group the items by product_id and sum the quantity).
- Add User Auth layer to the api that will check customer information before performing any operation.
- Add proper exception handler.
- Add percist layer to save the orders

### Improve the tests
- Mocking the convert rate request to have a fix conversion rate and test in integration the POST endpoint.
- Add unit test for the `getPrices` function to check if the totals are well calculated.
- Add coverage tests
- Add a CI to the repo
- Add linter and formatter to have clean code
