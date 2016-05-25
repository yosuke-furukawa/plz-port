const test = require('eater/runner').test;
const assert = require('assert');
const plzPort = require('../index');
const net = require('net');
const mustCall = require('must-call');

test('Port range check', (done) => {
  plzPort().then(mustCall((port) => {
    assert(port >= 3000);
    assert(port <= 65535);
    const server = net.createServer();
    server.listen(port, mustCall(() => {
      server.once('close', mustCall(() => {
        done(port);
      }));
      server.close();
    }));
    server.on('error', (err) => {
      assert.ifError(err);
    });
  }));
});

test('2000 port initial port', (done) => {
  plzPort(2000).then(mustCall((port) => {
    assert(port === 2000);
    const server = net.createServer();
    server.listen(port, mustCall(() => {
      server.once('close', mustCall(() => {
        done(port);
      }));
      server.close();
    }));
    server.on('error', (err) => {
      assert.ifError(err);
    });
  }));
});

test('Error over 65536 port initial port', (done) => {
  plzPort(65537).catch(mustCall((e) => {
    assert(e.message.match(/Over max port number/));
    done();
  }));
});

test('Error under 1 port initial port', (done) => {
  plzPort(1).catch(mustCall((e) => {
    assert(e.message.match(/Under min port number/));
    done();
  }));
});
