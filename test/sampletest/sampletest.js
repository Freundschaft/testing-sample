var User = require('../../user.js');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = require('chai').should();
var Promise = require('bluebird');
var sampleUser = require('../statics/user.json');

describe('User Functions', function () {
    describe('addFullName', function () {
        it('should concat firstName and lastName of a user to fullname', function () {
            sampleUser.birthday = new Date(sampleUser.birthday);
            return User.addFullName(sampleUser).should.eventually.have.property('fullName', sampleUser.firstName + ' ' + sampleUser.lastName);
        });
    });
});