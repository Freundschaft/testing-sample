var beispiel = require('../../user.js');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = require('chai').should();
var Promise = require('bluebird');

describe('user', function () {
    describe('parseUser', function () {
        it('should return a parsed User containing fullName and age', function () {
            var user = {firstName: 'John', lastName: 'Doe', birthday: new Date("December 17, 1995 03:24:00")};
            return Promise.all([
                beispiel.parseUser(user).should.eventually.have.property("longName", user.firstName + ' ' + user.lastName),
                beispiel.parseUser(user).should.eventually.have.property("age", 19)
            ]);
        });
    });

    describe('getAgeFromBirthday', function () {
        it('should return 19 for the given date', function () {
            var birthday = new Date("December 17, 1995 03:24:00");
            return beispiel.getAgeFromBirthday(birthday).should.eventually.equal(19);
            //Promise.resolve(2).should.eventually.be.within(Promise.resolve(1), Promise.resolve(6));
        });
    });
});