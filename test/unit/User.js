var User = require('../../user.js');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = require('chai').should();
var Promise = require('bluebird');
var sampleUser = require('../statics/user.json');

describe('user', function () {
    describe('getAgeFromBirthday', function () {
        it('should return 19 for the given date', function () {
            var birthday = new Date("December 17, 1995 03:24:00");
            return User.getAgeFromBirthday(birthday).should.eventually.equal(19);
            //Promise.resolve(2).should.eventually.be.within(Promise.resolve(1), Promise.resolve(6));
        });
    });

    describe('addFullName', function () {
        it('should concat firstName and lastName of a user to fullname', function () {
            sampleUser.birthday = new Date(sampleUser.birthday);
            return User.addFullName(sampleUser).should.eventually.have.property('fullName', sampleUser.firstName + ' ' + sampleUser.lastName);
        });
    });
});