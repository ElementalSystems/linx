
var Safe = Divhide.Safe;

var value = Safe.number(1);
expect(value).equals(1);

var value = Safe.number("");
expect(value).equals(0);

var value = Safe.number("1");
expect(value).equals(1);

var value = Safe.number({});
expect(value).equals(0);

var value = Safe.number("", 1);
expect(value).equals(1);
