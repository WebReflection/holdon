// node test/benchmark.js native 128 // native fails with big numbers
// node test/benchmark.js native 1000 fail // will fail indeed
// node test/benchmark.js holdon 128

var fileName = __filename;
var readFileCache = require('../build/holdon.node.js').create(['callbacks']);
var fs = require('fs');
var times = process.argv.some(function (arg) {
  return /^(\d+)$/.test(arg);
}) ? parseInt(RegExp.$1, 10) : 1000;
var fail = !!~process.argv.indexOf('fail');

function onFileRead(err, res) {
  if (fail && err) {
    console.error(err);
    process.exit(1);
  }
  if (!--i) theEnd(start);
}

function theEnd(start) {
    console.log(
      'content returned ' +
      times +' times in ' +
      (process.hrtime(start)[1] / 1000000).toFixed(3) +
      'ms'
    );
}

if (~process.argv.indexOf('native' )) {
  for (var i = 0, start = process.hrtime(); i < times; i++) {
    fs.readFile(fileName, onFileRead);
  }
} else {
  for (var i = 0, start = process.hrtime(); i < times; i++) {
    // only in case the cache entry called fileName
    // was not already present
    if (readFileCache.add(fileName, onFileRead)) {
      // read this file once and once done ...
      fs.readFile(fileName, function (err, res) {
        // invoke all callbacks after removing this cache
        readFileCache.remove(fileName).callbacks.forEach(function (callback) {
          callback.call(this, err, res);
        }, this);
      });
    }
  }
}

