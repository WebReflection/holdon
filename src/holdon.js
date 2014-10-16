function HoldOn(keys) {
  this._cache = {};
  this._keys = keys || ['result'];
}

(function (HoldOnPrototype, hOP) {

  // @public static
  HoldOn.create = function create(keys) {
    return new HoldOn(keys);
  };

  // @public prototype
  HoldOnPrototype.add = function add(id) {
    var
      isNew = !this.has(id),
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
  };

  HoldOnPrototype.get = function get(id) {
    var
      object = {},
      list = this._cache[id],
      keys = this._keys,
      length = keys.length,
      i = 0
    ;
    while (i < length) object[keys[i]] = list[i++];
    return object;
  };

  HoldOnPrototype.has = function has(id) {
    return hOP.call(this._cache, id);
  };

  HoldOnPrototype.remove = function remove(id) {
    var object = this.get(id);
    delete this._cache[id];
    return object;
  };

}(HoldOn.prototype, {}.hasOwnProperty));