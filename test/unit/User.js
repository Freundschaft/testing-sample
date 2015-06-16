var User = require('../../user.js');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = require('chai').should();
var sampleUser = require('../statics/user.json');

describe('user', function () {
    describe('getAgeFromBirthday', function () {
        context('if input parameter is valid', function () {
            it('should return an age between 0 and 150', function () {
                var birthday = new Date("December 17, 1995 03:24:00");
                return User.getAgeFromBirthday(birthday).should.eventually.be.within(0, 150);
            });
        });

        context('if input parameter is not a date', function () {
            it('should throw an error', function () {
                var invalidValue = 'foobar';
                return User.getAgeFromBirthday(invalidValue).should.eventually.be.rejected;
            });
            it('should throw an error', function () {
                var invalidValue = '2349080912';
                return User.getAgeFromBirthday(invalidValue).should.eventually.be.rejected;
            });
            it('should throw an error', function () {
                var invalidValue = new Date('foobar');
                return User.getAgeFromBirthday(invalidValue).should.eventually.be.rejected;
            });
        });

        context('if the return value is outside the valid range', function () {
            it('should throw an error', function () {
                var birthday = new Date("December 17, 2500 03:24:00");
                return User.getAgeFromBirthday(birthday).should.eventually.be.rejected;
            });
        });
    });

    describe('addFullName', function () {
        it('should concat firstName and lastName of a user to fullname', function () {
            sampleUser.birthday = new Date(sampleUser.birthday);
            return User.addFullName(sampleUser).should.eventually.have.property('fullName', sampleUser.firstName + ' ' + sampleUser.lastName);
        });
    });
});