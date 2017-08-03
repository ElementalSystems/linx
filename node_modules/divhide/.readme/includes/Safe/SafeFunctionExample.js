
var Safe = Divhide.Safe;

var fn = Safe.function(function(){});
expect(fn())
    .toBe(undefined);

var fn = Safe.function("");
expect(fn())
    .toBe(undefined);

var fn = Safe.function("", function(){ return 1; });
expect(fn())
    .toBe(1);
