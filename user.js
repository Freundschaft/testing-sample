var Promise = require("bluebird");
var request = Promise.promisifyAll(require('request'));

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