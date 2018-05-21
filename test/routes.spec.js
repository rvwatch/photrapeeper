const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const { database, app } = require('../server.js');

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return static content', (done) => {
    return chai.request(app)
      .get('/')
      .then(response => {
        response.should.have.status(200);
        response.should.be.html;
        done();
      })
      .catch(err => {
        throw err;
      });
  });
});

describe('API Routes', () => {

});