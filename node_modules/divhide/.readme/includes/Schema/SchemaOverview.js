
var Schema = Divhide.Schema;


/// get the schema
var schema = Schema.object({

        /// array with multiple strings
        data: Schema.array([ "" ]).repeatable().max(10),

        /// every other object key is optional
        "/.*/": Schema.number().optional()

    }).required();


/// apply the schema to the value
var value = schema.value({
    data: [ 1, 2, 3, 4, 5, 6],
    timestamp: "1404373579473"
});


/// test the value
expect(value).equals({
    data: [ '1', '2', '3', '4', '5' , '6'],
    timestamp: 1404373579473
});