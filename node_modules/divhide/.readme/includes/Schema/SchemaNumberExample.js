
var Schema = Divhide.Schema;

var schema = Schema.number()
                .optional()
                .min(3)
                .max(5)
                .compile();


/// value is correct
var value = schema.value(3);
expect(value).toBe(3);


/// optional value
var value = schema.value();
expect(value).equals(null);


/// value is undefined
expect(
    function(){
        schema.value(0);
    })
    .toThrow(
        new Error("The minimum value allowed is 3.")
    );


/// values exceed the max
expect(
    function(){
        schema.value(10);
    })
    .toThrow(
        new Error("The maximum value allowed is 5.")
    );


/// because is optional, is valid!
var isValid = schema.isValid();
expect(isValid).toBe(true);


isValid = schema.isValid(3);
expect(isValid).toBe(true);


isValid = schema.isValid(10);
expect(isValid).toBe(false);

