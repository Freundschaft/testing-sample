var express = require('express');
var User = require('./user');
var app = express();

app.get('/user', function (req, res) {
    res.status(200).send({firstName: 'John', lastName: 'Doe', birthday: new Date("December 17, 1995 03:24:00")});
});

app.get('/user/detailed', function (req, res) {
    var user = {firstName: 'John', lastName: 'Doe', birthday: new Date("December 17, 1995 03:24:00")};
    User.parseUser(user)
        .then(function (parsedUser) {
            res.status(201).send(parsedUser);
        });
});

module.exports = app;