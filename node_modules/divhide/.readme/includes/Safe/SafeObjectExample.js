
var Safe = Divhide.Safe;

var value = Safe.object({ one: 1 });
expect(value).equals({ one: 1 });

var value = Safe.object([]);
expect(value).equals({});

var value = Safe.object([], { one: 1 });
expect(value).equals({ one: 1 });

