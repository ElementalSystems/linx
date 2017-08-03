
var Schema = Divhide.Schema;

var serialized =
        Schema.object({
            "name"      : "",
            "friends"   : Schema.array([
                {
                    name: ""
                }
            ]).optional(),
        })
        .required()
        .serialize();

/// deserialize the object
var schema = Schema.deserialize(serialized);

/// let's get the object
var value = schema.value({
    id: 1,
    name: "Oscar",
    friends: [{ name: "Solange" }]
});

expect(value).equals({
    name: "Oscar",
    friends: [{ name: "Solange" }]
});

