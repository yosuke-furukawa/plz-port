const test = require('eater/runner').test;
const assert = require('assert');
const plzPort = require('../index');
const net = require('net');
const mustCall = require('must-call');

const alreadyUsePortServer = net.createServer();
alreadyUsePortServer.listen(3000);

test('already use 3000 port so change the port 3001', (done) => {
  plzPort(3000).then(mustCall((port) => {
    assert(port !== 3000);
    assert(port >= 3001);
    assert(port <= 65535);
    const server = net.createServer();
    server.listen(port, mustCall(() => {
      server.once('close', mustCall(() => {
        done(port);
      }));
      alreadyUsePortServer.close();
      server.close();
    }));
    server.on('error', (err) => {
      assert.ifError(err);
    });
  }));
});
