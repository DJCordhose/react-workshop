const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');
const db = require('../src/db');
const should = chai.should();

chai.use(chaiHttp);

function expectError(res, code) {
    res.should.have.status(code);
    res.body.should.include.key('error');
}

describe('GreetingServer', () => {
    beforeEach(() => {
        db.initialize();
    });

    describe('GET', () => {
        it('GET /greetings should return all greetings', done => {
            chai.request(server)
                .get('/greetings')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(4);
                    done();
                });
        });

        it('GET /greetings/id should return a single greeting by id', done => {
            chai.request(server)
                .get('/greetings/2')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.eql(db._greetings[1]);
                    done();
                });
        });

        it('GET /greetings/id should return 404 for an unknown id', done => {
            chai.request(server)
                .get('/greetings/666')
                .end((err, res) => {
                    expectError(res, 404);
                    done();
                });
        });

    });

    describe('POST', () => {
        it('POST /greetings with new greeting should save it and return new id', done => {
            chai.request(server)
                .post('/greetings')
                .send({name: 'Moni', greeting: 'Huhu!'})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.eql({id: 5});
                    const newGreetingInDatabase = db._greetings[4];
                    newGreetingInDatabase.should.be.eql({
                        id: 5, name: 'Moni', greeting: 'Huhu!'
                    });
                    done();
                });
        });

        it('POST /greetings with empty body  should fail with HTTP 400', done => {
            chai.request(server)
                .post('/greetings')
                .end((err, res) => {
                    expectError(res, 400);
                    done();
                });
        });

        it('POST /greetings with empty name should fail with HTTP 400', done => {
            chai.request(server)
                .post('/greetings')
                .send({greeting: 'Huhu!'})
                .end((err, res) => {
                    expectError(res, 400);
                    done();
                });
        });

        it('POST /greetings with empty greeting should fail with HTTP 400', done => {
            chai.request(server)
                .post('/greetings')
                .send({name: 'Moni'})
                .end((err, res) => {
                    expectError(res, 400);
                    done();
                });
        });
    });
});