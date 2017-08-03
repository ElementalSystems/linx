
var Schema = Divhide.Schema;

var schema = Schema
            .any()
            .required()
            .compile();


/// valid string value!
var value = schema.value("str");
expect(value).equals(value);


/// valid array value!
value = schema.value([1,2]);
expect(value).equals([1,2]);


/// because its required it fails
expect(
    function(){
        schema.value(null);
    })
    .toThrow(
        new Error("Value is required.")
    );