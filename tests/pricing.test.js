const request = require('supertest');
const pricing = require('../model/pricing');
const app = require('../app');
describe('Post Endpoint', () => {
  it('should process without symbol', async () => {
    const res = await request(app)
    .post('/')
    .send({
      order: {
        id: 12345,
        customer: {},
        items: [
          {
            product_id: 1,
            quantity: 1
          },
          {
            product_id: 2,
            quantity: 5
          },
          {
            product_id: 3,
            quantity: 1
          }
        ]
      }
    });
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('items')
    expect(res.body).toHaveProperty('total_price')
    expect(res.body).toHaveProperty('total_vat')
    expect(res.body).toHaveProperty('total_price_with_vat')
    expect(res.body.total_price_with_vat).toEqual(
        res.body.total_price + res.body.total_vat)
  });

  it('should process with symbol', async () => {
    const res = await request(app)
    .post('/')
    .send({
      order: {
        id: 12345,
        customer: {},
        items: [
          {
            product_id: 1,
            quantity: 1
          },
          {
            product_id: 2,
            quantity: 5
          },
          {
            product_id: 3,
            quantity: 1
          }
        ]
      },
      symbol: 'USD'
    });
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('items')
    expect(res.body).toHaveProperty('total_price')
    expect(res.body).toHaveProperty('total_vat')
    expect(res.body).toHaveProperty('total_price_with_vat')

  })
});

