
var Safe = Divhide.Safe;

var value = Safe.value(1);
expect(value).toBe(1);

var value = Safe.value("1");
expect(value).toBe("1");

var value = Safe.value(null);
expect(value).toBe(null);

var value = Safe.value(undefined);
expect(value).toBe(null);

var value = Safe.value(null, 1);
expect(value).toBe(1);

