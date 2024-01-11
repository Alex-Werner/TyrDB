const array = {
  insertSorted:(arr, item)=>{
    const comparator = function(a, b) {
      if (typeof a !== 'string') a = String(a);
      if (typeof b !== 'string') b = String(b);
      return (a > b ? 1 : (a < b ? -1 : 0));
    };
    let min = 0;
    let max = arr.length;
    let index = Math.floor((min + max) / 2);
    while (max > min) {
      if (comparator(item, arr[index]) < 0) {
        max = index;
      } else {
        min = index + 1;
      }
      index = Math.floor((min + max) / 2);
    }

    arr.splice(index, 0, item);
    return index;
  }
};
export default  array;
