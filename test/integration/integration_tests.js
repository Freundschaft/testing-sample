describe('#two', function () {
    it('should return 2', function () {
        return beispiel.two().should.eventually.equal(2);
    });
});

describe('#string', function () {
    it('should return "this is a string"', function (done) {
        beispiel.string()
            .then(function (result) {
                result.should.equal('this is a string');
                done();
            });
    });
});

describe('#random', function () {
    it('should contain a name property that is "random"', function (done) {
        beispiel.random()
            .then(function (result) {
                result.name.should.equal('random');
                done();
            });
    });

    it('should contain an array with length 3', function (done) {
        beispiel.random()
            .then(function (result) {
                result.values.length.should.equal(3);
                done();
            });
    });

    it('should contain an array with numbers from 1 to 10 as first element', function (done) {
        beispiel.random()
            .then(function (result) {
                result.values[0].should.be.within(1, 10);
                done();
            });
    });
});

describe('#fail', function () {
    it('should throw a "fail" error', function (done) {
        beispiel.fail()
            .catch(function (err) {
                err.message.should.equal('fail');
                done();
            });

    });
});