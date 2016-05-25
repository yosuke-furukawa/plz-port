plz-port
============
[![npm version](https://badge.fury.io/js/plz-port.svg)](https://badge.fury.io/js/plz-port)
[![Build Status](https://travis-ci.org/yosuke-furukawa/plz-port.svg?branch=master)](https://travis-ci.org/yosuke-furukawa/plz-port)
[![Coverage Status](https://coveralls.io/repos/github/yosuke-furukawa/plz-port/badge.svg?branch=master)](https://coveralls.io/github/yosuke-furukawa/plz-port?branch=master)

please give me any port if the port is opened.

```javascript
const plzPort = require('plz-port');
plzPort().then((port) => {
  assert(port >= 3000);
  assert(port <= 65535);
});

plzPort(3000).then((port) => {
  console.log(port); // 3000 if the port is opened.
});
```
