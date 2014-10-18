//remove:
var HoldOn = require('../build/holdon.node.js');
//:remove

wru.test([
  {
    name: "main",
    test: function () {
      wru.assert(typeof HoldOn == "function");
      wru.assert(typeof HoldOn.create == "function");
    }
  },{
    name: 'methods',
    test: function () {
      var cache = HoldOn.create(['a', 'b']);
      wru.assert('is instanceof HoldOn', cache instanceof HoldOn);
      var uniqueId = Math.random();
      wru.assert('if key is unknown, it does not have it', !cache.has(uniqueId));
      wru.assert('so that if never added, returns true', cache.add(uniqueId, 1, 2));
      wru.assert('otherwise returns false', !cache.add(uniqueId, 3, 4));
      wru.assert('if key is known, it does have it', cache.has(uniqueId));
      var result = cache.get(uniqueId);
      wru.assert('result object is the expected one',
        JSON.stringify(result) ===
        '{"a":[1,3],"b":[2,4]}'
      );
      wru.assert('result object is always different',
        cache.get(uniqueId) != result
      );
      wru.assert('also removing object returns a result',
        JSON.stringify(cache.remove(uniqueId)) ===
        '{"a":[1,3],"b":[2,4]}'
      );
      wru.assert('and unique id is not present anymore', !cache.has(uniqueId));
      var keyA = 'a' + Math.random();
      var keyB = 'b' + Math.random();
      cache.add(keyA, 1, 2);
      cache.add(keyB, 3, 4);
      wru.assert('different keys do not interfer with each other',
        JSON.stringify(cache.get(keyA)) === '{"a":[1],"b":[2]}'
        &&
        JSON.stringify(cache.get(keyB)) === '{"a":[3],"b":[4]}'
      );
    }
  }, {
    name: 'shortcuts',
    test: function () {
      var cache = HoldOn.create();
      var uinqueId = Math.random();
      wru.assert('creation time', cache.add(uinqueId, 1));
      wru.assert('after creation time', !cache.add(uinqueId, 2));
      var got = JSON.stringify(cache.get(uinqueId));
      wru.assert('remove and get',
        JSON.stringify(cache.remove(uinqueId)) === got &&
        got === '{"values":[1,2]}'
      );
      wru.assert('actually removed', !cache.has(uinqueId));
    }
  }
]);
