
var Safe = Divhide.Safe;

var value = Safe.boolean(true);
expect(value).toBe(true);

var value = Safe.boolean(false);
expect(value).toBe(false);

var value = Safe.boolean(1);
expect(value).toBe(true);

var value = Safe.boolean("1");
expect(value).toBe(true);

var value = Safe.boolean("0");
expect(value).toBe(false);

var value = Safe.boolean({});
expect(value).toBe(false);

var value = Safe.boolean({}, true);
expect(value).toBe(true);

var value = Safe.boolean([]);
expect(value).toBe(false);

var value = Safe.boolean(null);
expect(value).toBe(false);
