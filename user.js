var Promise = require("bluebird");
var request = Promise.promisifyAll(require('request'));

exports.two = two;
exports.string = string;
exports.random = random;
exports.fail = fail;
exports.getAgeFromBirthday = getAgeFromBirthday;
exports.parseUser = parseUser;
exports.addFullName = addFullName;

function getUserOverNetwork() {
    var requestSettings = {
        'url': 'http://gfnork.de/test'
    };
    return request.postAsync(requestSettings)
        .spread(function (httpResponse, body) {
            body = JSON.parse(body);
            return body.user;
        })
        .then(parseUser);
}

function addAgeToUser(user) {
    return getAgeFromBirthday(user.birthday)
        .then(function (age) {
            user.age = age;
            return user;
        });
}

function parseUser(user) {
    return addAgeToUser(user)
        .then(addFullName);
}

function addFullName(user) {
    return new Promise(function (resolve, reject) {
        user.longName = user.firstName + ' ' + user.lastName;
        resolve(user);
    });
}

function getAgeFromBirthday(birthday) {
    return new Promise(function (resolve, reject) {
        if (birthday instanceof Date) {
            var ageDifMs = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDifMs); // milliseconds from epoch
            resolve(Math.abs(ageDate.getUTCFullYear() - 1970));
        } else {
            reject('parameter birthday is not a date');
        }
    });
}

//returns 2 after 2 sec
function two() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(2);
        }, 2000);
    });
}

//returns 'this is a string'
function string() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('this is a string');
        }, 2000);
    });
}

//returns a object with 'random' as name and an array with 3 numbers from 1 to 10
function random() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var result = {
                name: 'random', values: [
                    Math.floor((Math.random() * 10) + 1),
                    Math.floor((Math.random() * 10) + 1),
                    Math.floor((Math.random() * 10) + 1)
                ]
            };
            resolve(result);
        }, Math.floor((Math.random() * 3000))); //random timeout
    });
}

//returns an error after 2 sec
function fail() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(new Error('fail'))
        }, 2000);
    });
}