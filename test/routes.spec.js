const chai = require('chai');
const should = chai.should(); // eslint-disable-line
const chaiHttp = require('chai-http');
const { database, app } = require('../server.js');

chai.use(chaiHttp);

describe('API tests', () => {

  beforeEach((done) => {
    database.migrate.rollback()
      .then(() => {
        database.migrate.latest()
          .then(() => {
            return database.seed.run()
              .then(() => {
                done();
              });
          });
      });
  });

  it('should GET all the photos', (done) => {
    chai.request(app)
      .get('/api/v1/albums')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.an('array');
        response.body.length.should.equal(1);
        done();
      });
  });

  it('should POST a new Photo to the album', (done) => {
    chai.request(app)
      .post('/api/v1/albums')
      .send({
        title: 'space kittens!!',
        url: 'https://i.imgur.com/VrPVpPz.jpg'
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.an('object');
        done();
      });
  });
  
  it('should THROW a 422', (done) => {
    chai.request(app)
      .post('/api/v1/albums')
      .end((err, response) => {
        response.should.have.status(422);
        response.body.should.be.an('object');
        done();
      });
  });

  it('should DELETE a photo from the DB', (done) => {
    chai.request(app)
      .delete('/api/v1/albums/1')
      .end((error, response) => {
        response.should.have.status(204);
        done();
      });
  });

  it('should not DELETE a photo if ID does not exist', (done) => {
    chai.request(app)
      .delete('/api/v1/albums/987234')
      .end((error, response) => {
        response.should.have.status(422);
        done();
      });
  });

  it('should not DELETE a photo if no ID is included', (done) => {
    chai.request(app)
      .delete('/api/v1/albums/theCat')
      .end((error, response) => {
        response.should.have.status(500);
        done();
      });
  });

});
