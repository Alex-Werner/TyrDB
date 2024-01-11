const math = {
  randomBetweenMinAndMax: function (min, max, precision = 1) {
    if (typeof(precision) === 'undefined') precision = 1;
    var r = Math.floor(Math.random() * (max - min + precision) / precision);
    return (r * precision + min);
  }
};
export default  math;
