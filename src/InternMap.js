export class InternMap extends Map {
  constructor(entries, key = keyof) {
    "worklet";

    super();
    Object.defineProperties(this, {
      _intern: { value: new Map() },
      _key: { value: key },
    });
    if (entries != null)
      for (const [key, value] of entries) this.set(key, value);
  }
  get(key) {
    "worklet";

    return super.get(intern_get(this, key));
  }
  has(key) {
    "worklet";

    return super.has(intern_get(this, key));
  }
  set(key, value) {
    "worklet";

    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    "worklet";

    return super.delete(intern_delete(this, key));
  }
}

export class InternSet extends Set {
  constructor(values, key = keyof) {
    super();
    Object.defineProperties(this, {
      _intern: { value: new Map() },
      _key: { value: key },
    });
    if (values != null) for (const value of values) this.add(value);
  }
  has(value) {
    return super.has(intern_get(this, value));
  }
  add(value) {
    return super.add(intern_set(this, value));
  }
  delete(value) {
    return super.delete(intern_delete(this, value));
  }
}

function intern_get({ _intern, _key }, value) {
  "worklet";

  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}

function intern_set({ _intern, _key }, value) {
  "worklet";

  const key = _key(value);
  if (_intern.has(key)) return _intern.get(key);
  _intern.set(key, value);
  return value;
}

function intern_delete({ _intern, _key }, value) {
  "worklet";

  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(value);
    _intern.delete(key);
  }
  return value;
}

function keyof(value) {
  "worklet";

  return value !== null && typeof value === "object" ? value.valueOf() : value;
}
