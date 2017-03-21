const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');

const assert = chai.assert;
const should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  describe('/Post User', () =>{
    it('Should return success', (done) =>{
      const user = {
        user_id: "1211232334442112",
        user_name: "ziggmo",
        first_name: "Ziggs",
        last_name: "Moore",
        email: "ziggy.moore@bark.com"
      };

      chai.request(server)
        .post('/user')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.be.eql('success');
          done();
        });
    });

    it('Should return 500 error because user name is taken', (done) => {
      const user = {
        user_id: "1211232333232",
        user_name: "ziggmo",
        first_name: "Anubis",
        last_name: "Egypt",
        email: "anubis@egypt.com"
      };

      chai.request(server)
        .post('/user')
        .send(user)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql("duplicate key value violates unique constraint \"person_user_name_key\"");
          done();
        });

    });
  });
});
