var app = require('../../app.js'),
    request = require('supertest');
var should = require('chai').should();

describe('GET /users', function () {
    it('respond with json', function (done) {
        request(app)
            .get('/user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function (res) {
                res.body.should.have.property("firstName");
                res.body.should.have.property("lastName");
                res.body.should.have.property("birthday");
                var birthday = new Date(res.body.birthday);
                birthday.should.be.a('Date');
            })
            .expect(200, done);
    })
});

describe('GET /users', function () {
    it('respond with json containing enriched parameters', function (done) {
        request(app)
            .get('/user/detailed')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function (res) {
                res.body.should.have.property("firstName");
                res.body.should.have.property("lastName");
                res.body.should.have.property("longName");
                res.body.should.have.property("birthday");
                var birthday = new Date(res.body.birthday);
                birthday.should.be.a('Date');
                res.body.should.have.property("age");
            })
            .expect(200, done);
    })
});