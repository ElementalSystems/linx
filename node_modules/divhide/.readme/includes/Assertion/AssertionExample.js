
/// Assertion builder
var Assertion = Divhide.Assertion;

/// Create the custom Assert facility
var Assert = new Assertion({

    /**
     *
     * Tests if the string starts with the given value
     *
     * @param  {String} val
     * @param  {String} str
     * @return {String}
     */
    startsWith: function(val, str){

        if(val.indexOf(str) !== 0){
            throw new Error("Does not starts with " + str);
        }

    }

});

/// Test if the value is valid
var isValid = Assert
                .required()
                .string()
                .startsWith("Mary")
                .isValid("Mary and Peter");

expect(isValid)
    .toBe(true)


/// Assert value
var value = Assert
            .required()
            .string()
            .startsWith("Mary")
            .assert("Mary and Peter");

expect(value)
    .equals("Mary and Peter");

