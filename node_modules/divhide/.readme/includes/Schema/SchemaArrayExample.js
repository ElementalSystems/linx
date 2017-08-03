
var Schema = Divhide.Schema;


/// Array schema ( no repeatable)
var schema = Schema
    .array([ Schema.string().default("value"), Schema.number(), Schema.string() ])
    .optional()
    .compile();


/// because its optional it returns null
var value = schema.value();
expect(value).toBe(null);


/// The value is right!
value = schema.value([ '1', 2, '3' ]);
expect(value).equals([ '1', 2, '3']);


/// array have more items than it should
expect(
    function(){
        schema.value([ '1', 2, '3', 4, 5, 6 ])
    })
    .toThrow(
        new Error("Expected list with 3 items but found 6.")
    );


/// Wrong type!
expect(
    function(){
        schema.value(10);
    })
    .toThrow(
        new Error("'array' was expected but found 'number' instead.")
    );


///
/// Just another way to write the rule!
///


var schema = Schema
    .array([ Schema.string(), Schema.number() ])
    .repeatable()
    .optional()
    .compile();


// Get the value
var value = schema.value(["1", 2, "3", 4]);
expect(value).equals(["1", 2, "3", 4]);


// because the number of item on the array must be multiple of 2
// an error is thrown
expect(
    function(){
        schema.value(["1", 2, "3"])
    })
    .toThrow(
        new Error("Expected list length to be multiple of 2 but found length of 3.")
    );

