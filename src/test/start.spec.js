import request from 'supertest'
import { expect } from 'chai'
import app from '../index'

describe('GET /', () => {
  it('Welcome Endpoint', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body).to.have.property("message");
      })
    done();
  })
});
