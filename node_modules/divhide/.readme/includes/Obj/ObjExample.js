
var Obj = Divhide.Obj;

var results = Obj.filter({ "one": 1, "two": 2 });
expect(results)
    .toEqual(["one", "two"]);

var results = Obj.filter({ "one": 1, "two": 2 }, "one");
expect(results)
    .toEqual(["one"]);


var results = Obj.filter({ "one": 1, "two": 2 }, "three");
expect(results)
    .toEqual([]);