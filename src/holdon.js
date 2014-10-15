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