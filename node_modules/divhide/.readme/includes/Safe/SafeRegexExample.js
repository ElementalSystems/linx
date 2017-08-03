
var Safe = Divhide.Safe;

var value = Safe.regexp(/regexp/);
expect(value)
    .toEqual(/regexp/);

var value = Safe.regexp("/regexp/");
expect(value)
    .toEqual(/regexp/);

var value = Safe.regexp("");
expect(value)
    .toEqual(/^$/);

var value = Safe.regexp("name");
expect(value)
    .toEqual(/^name$/);

var value = Safe.regexp({}, /regexp/);
expect(value)
    .toEqual(/regexp/);
