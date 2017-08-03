
var Safe = Divhide.Safe;

var value = Safe.string("");
expect(value).toBe("");

var value = Safe.string({});
expect(value).toBe("");

var value = Safe.string({}, "default");
expect(value).toBe("default");

