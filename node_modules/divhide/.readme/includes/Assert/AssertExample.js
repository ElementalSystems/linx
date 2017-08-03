
var Assert = Divhide.Assert;

/// Test if the value is valid
var isValid = Assert.required()
    .string()
    .regex("^M")
    .max(10)
    .min(5)
    .isValid("Mary");

expect(isValid)
    .toBe(false);


/// Valid assertion:
var obj = Assert.required()
    .array()
    .max(5)
    .assert([1, 2, 4, 5]);

expect(obj)
    .equals([1, 2, 4, 5]);


/// Invalid assertion:
var fn = function(){

    Assert.required()
        .array()
        .max(1) /// will be on array context
        .assert(["first", "second"]);

};

expect(fn)
    .toThrow();

