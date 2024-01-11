const is = {
  undef: val => val === undefined,
  string: str => typeof str === 'string',
  hex: h => is.string(h) && (h.match(/([0-9]|[a-f])/gim) || []).length === h.length,
};
export default  is;
