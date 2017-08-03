
var Schema = Divhide.Schema;

var schema =
        Schema.object({
            "/^optional/"   : Schema.string().optional(),
            "number"        : 0,
            "string"        : "",
        })
        .required()
        /// TIP: When compiled the schema is faster
        .compile();


/// let's get the object
var value = schema.value({
    string      : "awesome!",
    number      : "0",
    optional1   : "1",
    optional2   : "2",
    other       : 1
});


/// Please notice that some of the object properties were
/// not included!
expect(value).equals({
    "number": 0,
    "string": "awesome!",
    "optional1": "1",
    "optional2": "2"
});

