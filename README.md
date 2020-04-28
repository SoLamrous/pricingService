# Pricing Service

## Running the app
You need to have node installed

- `npm install`
- `npm start`

The app will be running on the port `3000`

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
## Test
`npm test` to run the tests

## Improvements
