
var Arr = Divhide.Arr;

var value = Arr.index([1 ,2, 3], 0);
expect(value).toBe(1);

var value = Arr.index([1 ,2, 3], 10);
expect(value).toBeNull();

var first = Arr.first([1 ,2, 3]);
expect(first).toBe(first);

var last = Arr.last([1 ,2, 3]);
expect(last).toBe(3);

var length = Arr.length([1 ,2, 3]);
expect(last).toBe(3);

var array = [1, 2, 3];
Arr.insert(array, 4);
expect(array).toEqual([1, 2, 3, 4]);

var array = Arr.insert([1 ,2, 3], [4, 5]);
expect(array).toEqual([1, 2, 3, 4, 5]);

var array = Arr.insert([1 ,2, 3], -1, 0);
expect(array).toEqual([-1, 1, 2, 3]);

var array = [1, 2, 3];
Arr.remove(array, 0);
expect(array).toEqual([2, 3]);

var array = [1, 2, 3];
Arr.remove(array, 0, 2);
expect(array).toEqual([3]);
