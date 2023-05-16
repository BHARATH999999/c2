const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./api');

chai.use(chaiHttp);
const expect = chai.expect;

describe('API Tests', () => {
  let userId;

  it('should get all records and expect an empty array', (done) => {
    chai
      .request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.be.empty;
        done();
      });
  });

  it('should create a new object and expect a response containing the newly created record', (done) => {
    chai
      .request(app)
      .post('/api/users')
      .send({ name: 'John Doe' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('_id');
        userId = res.body._id; // Store the created user's ID for later use
        done();
      });
  });

  it('should get the created record by ID', (done) => {
    chai
      .request(app)
      .get(`/api/users/${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body._id).to.equal(userId);
        done();
      });
  });

  it('should update the created record and expect a response containing the updated object', (done) => {
    chai
      .request(app)
      .put(`/api/users/${userId}`)
      .send({ name: 'Updated Name' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body._id).to.equal(userId);
        expect(res.body.name).to.equal('Updated Name');
        done();
      });
  });

  it('should delete the created object by ID and expect a confirmation of successful deletion', (done) => {
    chai
      .request(app)
      .delete(`/api/users/${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Object deleted successfully');
        done();
      });
  });

  it('should not find the deleted object by ID', (done) => {
    chai
      .request(app)
      .get(`/api/users/${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message', 'Object not found');
        done();
      });
  });
});
