
var Schema = Divhide.Schema;


/// String schema
var schema = Schema.string()
                .required()
                .min(3)
                .max(5);


/// returns the value
var value = schema.value("hello");
expect(value).toBe("hello");


/// value is required!
expect(
    function(){
        schema.value();
    })
    .toThrowError("Value is required., The minimum value allowed is 3.");


/// value is required!
expect(
    function(){
        schema.value("hello world");
    })
    .toThrow(new Error("The maximum value allowed is 5."));


/// Check if is valid
var isValid = schema.isValid("");
expect(isValid).toBe(false);


var isValid = schema.isValid("hello");
expect(isValid).toBe(true);


var isValid = schema.isValid("hello world");
expect(isValid).toBe(false);

