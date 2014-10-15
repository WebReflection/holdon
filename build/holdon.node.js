/*!
Copyright (C) 2014 by Andrea Giammarchi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
module.exports = HoldOn;

HoldOn.create = function create(keys) {
  return new HoldOn(keys);
};

function HoldOn(keys) {
  this._cache = {};
  this._keys = keys || ['result'];
}

(function (HoldOnPrototype) {

  var hOP = HoldOnPrototype.hasOwnProperty;

  HoldOnPrototype.add = add;
  HoldOnPrototype.get = get;
  HoldOnPrototype.has = has;
  HoldOnPrototype.remove = remove;

  function add(id) {
    var
      isNew = !hOP.call(this._cache, id),
      list = isNew ? [] : this._cache[id],
      length = this._keys.length,
      i = 0
    ;
    if (isNew) {
      this._cache[id] = list;
      while (i < length) list[i++] = [];
      i = 0;
    }
    while (i < length) list[i].push(arguments[++i]);
    return isNew;
  }

  function get(id) {
    var
      object = {},
      list = this._cache[id],
      keys = this._keys,
      length = keys.length,
      i = 0
    ;
    while (i < length) object[keys[i]] = list[i++];
    return object;
  }

  function has(id) {
    return hOP.call(this._cache, id);
  }

  function remove(id) {
    var object = get.call(this, id);
    delete this._cache[id];
    return object;
  }

}(HoldOn.prototype));