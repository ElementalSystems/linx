# [![Divhide](http://blog.divhide.com/assets/images/divhide_128px.png)](http://divhide.com/) divhide-core

[![Build Status](https://travis-ci.org/divhide/node-divhide.png?branch=master)](https://travis-ci.org/divhide/node-divhide) [![Coverage Status](https://coveralls.io/repos/divhide/divhide-core/badge.svg)](https://coveralls.io/r/divhide/divhide-core) [![NPM version](https://badge.fury.io/js/divhide.svg)](http://badge.fury.io/js/divhide) [![Dependency Status](https://gemnasium.com/divhide/divhide-core.svg)](https://gemnasium.com/divhide/divhide-core)

[![NPM Stats](https://nodei.co/npm/divhide.png?downloads=true)](https://www.npmjs.com/package/divhide) ![alt text](https://raw.githubusercontent.com/divhide/divhide-core/master/.readme/assets/bower-logo.jpg) ![alt text](https://raw.githubusercontent.com/divhide/divhide-core/master/.readme/assets/titanium-logo.png)

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=NYVPSL7GBYD6A&lc=US&item_name=Oscar%20Brito&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted)


Javascript codebase to use on the Browser, NodeJS and other javascript platforms. This provides a set of utilities that you can use everywhere.

The intent of this library is to expose some building blocks that you can use when building a library, a mobile application, a web page, a web server, a command line utility...

Please note that **all examples are integrated on the CI build** and that's the reason why you'll see `expect` statements.



### Install

### Node.js

```

npm install divhide

```

``` js


var Divhide = require("divhide");
...


```


### Bower

```bash

bower install divhide
## or download **divhide.js** from the **dist/** folder.

```



``` html


<script type="text/javascript" src="//bower_components/divhide/dist/divhide.js"></script>
<script type="text/javascript">
    var fn = Divhide.Safe.function();
    ...
</script>


```

### Titanium

```

Download dist/divhide.js from github and use it as a library.

e.g.
var Divhide = require("/vendor/divhide");

```




## API

* [API](#api)
  * [I18N](#i18n)
  * [Exception](#exception)
  * [Assert](#assert)
  * [Assertion](#assertion)
  * [Chain](#chain)
  * [Schema](#schema)
  * [CustomSchema](#customschema)
  * [Type](#type)
  * [Safe](#safe)
  * [Obj](#obj)
  * [Arr](#arr)
* [Contribute](#contribute)
* [Authors](#authors)
* [License](#license)


### I18N

The Internationalization package. This package provides you with some utilities that will help you
on your internationalization tasks.

There's no intention for this library to contain translations for other languages.

#### I18NString

The I18NString is a String representation that can be translated. This string can be a plain String or
a lodash template.

This implementation creates a clear separation between the translation mechanism and it's internal logic. This package is used across the library in order to provide I18N out of the box!

**Constructor**

* `new I18N.String(message, data?, translations?)`
<br />
Creates a String instance with the given *message*, associated *data*, and an object which contain the *translation*.

**Methods**

* `.toString(translations?)`
<br />
Gets the string representation of the error. If _translations_ object is provided the message Error message will try to be translated.

**Example**

```js


var I18NString = Divhide.I18N.String;

/// the external translation data
var Portuguese = {
    "hello <%= username %>": "olá <%= username %>"
};

/// create a I18NString (message + data)
var message = new I18NString("hello <%= username %>", { username: "oscar" });

/// Gets the English message
var en = message.toString();
expect(en)
    .toBe("hello oscar");

/// Gets the Portuguese message
var en = message.toString(Portuguese);
expect(en)
    .toBe("olá oscar");


```


### Exception

The Exception package provides some utilities created in order to normalize the Error handling.

All the Exceptions classes inherit from Error. Also, these classes are using the I18N
package.


#### Exception

The Exception class inherits from Error. This class is integrated with I18N package.

**Constructor**

* `new Exception.Exception(message, data?)`
<br />
Creates an instance of an exception with the given _message_ and _data_.

**Methods**

* `.message`
<br />
Gets the string representation of the error.

* `.toString(translations?)`
<br />
Gets the string representation of the I18NString. You can provide a *translation* object.

**Example**

```js


var Exception = Divhide.Exception.Exception;

/// the external translation data
var Portuguese = {
    "The maximum value allowed is <%= value %>.": "Valor máximo é <%= value %>."
};

var error = new Exception(
    "The maximum value allowed is <%= value %>.",
    { value: 10 });

/// Exception instance is an error!
expect(error instanceof Error)
    .equals(true);

/// Exception message
expect(error.toString())
    .equals("The maximum value allowed is 10.");

/// I18N Exception message
expect(error.toString(Portuguese))
    .equals("Valor máximo é 10.");



```

#### ExceptionList

This allows you to create an Exception that contains inner exceptions.

The ExceptionList is also an instance of Error and compatible with the I18N package.

**Constructor**

* `new Exception.ExceptionList()`

**Methods**

* `.message`
<br />
Gets the string representation of the ExceptionList.

* `.items`
<br />
Gets the list of inner Error.

* `.length`
<br />
Gets length of the ExceptionList

* `.clear()`
<br />
Clear the ExceptionList

* `.push(Error)`
<br />
Push an Error instance to the ExceptionList

* `.push(ExceptionList)`
<br />
Merge the given ExceptionList into the instance

* `.toString(translations?)`
<br />
Gets the string representation of the I18NString. You can provide a *translation* object.


**Example**

```js


var Exception       = Divhide.Exception.Exception,
    ExceptionList   = Divhide.Exception.ExceptionList;


var errors = new ExceptionList();

/// is an instance of Error
expect(errors instanceof Error)
    .toEqual(true);

/// adding errors to ExceptionList ( you can also merge other ExceptionList! )
errors.push( new Exception("Error1") );
errors.push( new Exception("Error2") );
errors.push( new Exception("Error3") );

/// get length of the list
expect(errors.length)
    .toEqual(3);

/// get an error from the list
expect(errors.items[0].toString())
    .toEqual("Error1");

/// get the translated error
expect(errors.toString({ "Error1": "Error 1", "Error2": "Error 2", "Error3": "Error 3" }))
    .toEqual("Error 1, Error 2, Error 3");




```


### Assert

The Assert facility provides an assertion expression builder with some pre-built functions.

**Methods**

* `.required()`
<br />
Set the expected value to be defined

* `.string()`
<br />
Set the expected value to be a string

* `.array()`
<br />
Set the expected value to be an array

* `.object()`
<br />
Set the expected value to be an object

* `.number()`
<br />
Set the expected value to be a number

* `.max(number)`
<br />
Set the expected value to have a specified maximum. In the case of String or Array the context will be the value length. In the case of an object will be the number of keys

* `.min(number)`
<br />
Set the expected value to have a specified minimum. In the case of String or Array the context will be the value length. In the case of an object will be the number of keys

* `.instanceOf(fn)`
<br />
Set the expected value to be an instance of the given function.

* `.regex(value)`
<br />
Set the expected value to pass the regex

* `.isValid(value)`
<br />
Test if the given value is valid within the current assertion

* `.assert(value)`
<br />
Return the given value if valid; otherwise will throw an Exception

**Example**

```js


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




```



### Assertion

Assertion facility provides a way to build custom Asserts. You can create your own assertion functions
and integrate them with the Assert facility.

**Constructor**

* `new Assertion(methods)`
<br />
Creates a custom assertion instance that contains the given methods plus the default methods (see Assert).


```js


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





```




### Chain


Chain facility provides an API to create chainable functions. Each Chain is created by a list of chainable functions, a list of evaluation
function and some options.

**Constructor**

* `new Chain(chainableFns, evaluationFns, options)`
<br />
Creates a Chain instance that allows you to execute chainable methods (__chainableFns__). The chain is only executed
when an evaluation method (__evaluationFns__) is called.
<br />
    * chainableFns
    * evaluationFns
    * options - `{ pipe: Boolean, type: Function, argument: *, scope: Object }`.

```js


var Chain = Divhide.Chain;


var Maths = new Chain(

    /// the chaining fns
    {
        sum: function(i,j){
            return i + j;
        },

        sub: function(i, j){
            return i - j;
        }
    },

    /// the evaluation fns
    {
        calculate: function(result, err){
            return result;
        }
    },

    /// the options
    {

        /// if true the return of a function is passed as an argument to the next one
        /// if false, the evaluation arguments are passed to every chain function (default)
        pipe: true

    });


var value = Maths.sum(5)
    .sub(3)
    .sum(10)
    .calculate(0);

expect(value)
    .toBe(12);



```




### Schema

The Schema facility provide an easy way to write validation rules. Using a chainable API you can
compile and/or evaluate the rules.

**Methods**

`.any()`
<br />
Set the expected type as any object.

`.strict()`
<br />
Disable the type coercion. Strict types are required.

`.string()`
<br />
Set the expected type as a string

`.number()`
<br />
Set the expected type as a number

`.boolean()`
<br />
Set the expected type as a boolean

`.object(value)`
<br />
Set the expected type as an object. The **value** is an object with rules.

`.array(value)`
<br />
Set the expected type as an object. The **value** is an array with rules.

`.function()`
<br />
Set the expected type as a function.

`.required()`
<br />
Set as required.

`.optional()`
<br />
Set as optional

`.default(value)`
<br />
Set the default value. This is used when the schema its required and the provided value is null.

`.repeatable()`
<br />
Set the type as repeatable. This repeats the schema through the structure (array only!).

`.min(value)`
<br />
Set the min value expected. If in number context the value is used. If in string context the length is used.
If in array context the length is used. If in object context the number of keys is used.

`.max(value)`
<br />
Set the max value expected. If in number context the value is used. If in string context the length is used.
If in array context the length is used. If in object context the number of keys is used.

`.regex(value)`
<br />
Sets a regexp condition ( only use on string context! )

`.compile()`
<br />
Compiles the schema. If you are using the same Schema multiple time you can compile it for performance reasons.
This avoid compiling the Schema before every usage.

`.value(value)`
<br />
Test the schema returning the normalized value if valid. Throws an Error if invalid.

`.isValid(value)`
<br />
Test the schema return if its valid or not.

`.errors(value)`
<br />
Test the schema returning an Array with the errors

`.serialize()`
<br />
Gets the serialized schema representation.

`.deserialize(value)`
<br />
Gets the Schema from the given value.


**Example** overview

```js


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



```

**Example** String Schema

```js


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





```

Time to see some code! Some usage examples are described below.

**Example** Number Schema

```js


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





```

**Example** Schema (de)serialization

```js


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





```

**Example** Object Schema

Objects schema is set by applying rules to each property of the object. You can also use regular expressions on
the schema object keys to give better filtering.

You can also set the schema object keys to primitive values which will be interpreted as `required().default(value)`
in the schema.

```js


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





```
**Example** Array Schema

The following example describe an array rule that is optional and its expecting three items.

```js


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





```



### CustomSchema


### Type

Type facility provides an API that can help you with typical operations using the javascript
data Types.

**Methods**

* `.of(value)`
<br />
Gets the string representation of the given value.

* `.isArray(value)`

* `.isBoolean(value)`

* `.isFunction(value)`

* `.isString(value)`

* `.isObject(value)`

* `.isBoolean(value)`

* `.isRegExp(value)`

* `.isRegExpStr(value)`

* `.isNumber(value)`

* `.instanceOf(value)`

* `.isDefined(value)`
<br />
Checks if the value is defined.

* `.isEmpty(value)`
<br />
Checks if the value is empty (executed in string, list and object context ).

```js


var Type = Divhide.Type;

var type = Type.of({});
expect(type).toBe("object");

var type = Type.of([]);
expect(type).toBe("array");

var type = Type.of(1);
expect(type).toBe("number");

var type = Type.of("name");
expect(type).toBe("string");

var type = Type.of(true);
expect(type).toBe("boolean");

var isArray = Type.isArray([]);
expect(isArray).toBe(true);

var isBoolean = Type.isBoolean(true);
expect(isBoolean).toBe(true);

var isFunction = Type.isFunction(function(){});
expect(isFunction).toBe(true);

var isString = Type.isString("");
expect(isString).toBe(true);

var isObject = Type.isObject({});
expect(isObject).toBe(true);

var isObject = Type.isObject(null);
expect(isObject).toBe(false);

var isRegExp = Type.isRegExp(/reg/);
expect(isRegExp).toBe(true);

var isNumber = Type.isNumber(1);
expect(isNumber).toBe(true);

var isNumber = Type.isNumber("1.1");
expect(isNumber).toBe(true);

var isDefined = Type.isDefined(null);
expect(isDefined).toBe(false);

var isDefined = Type.isDefined(undefined);
expect(isDefined).toBe(false);

var isEmpty = Type.isEmpty("");
expect(isEmpty).toBe(true);

var isEmpty = Type.isEmpty([]);
expect(isEmpty).toBe(true);

var isEmpty =  Type.isEmpty({});
expect(isEmpty).toBe(true);

var isEmpty =  Type.isEmpty(null);
expect(isEmpty).toBe(true);

var isString = Type.instanceOf("string", String);
expect(isString).toBe(true);




```







### Safe


Safe facility provides an API that can helps you safelly working with javascript data types. This methods
are supposed to work with different value types.

**Methods**

* `Safe.array(value, defaultValue?)`
<br />
Gets the value in the array representation. __defaultValue__ is returned if defined and if value is not
an array.

* `Safe.boolean(value, defaultValue?)`

* `Safe.string(value, defaultValue?)`

* `Safe.object(value, defaultValue?)`

* `Safe.number(value, defaultValue?)`

* `Safe.function(value, defaultValue?)`

* `Safe.value(value, defaultValue?)`

* `Safe.regexp(value, defaultValue)`

* `Safe.instanceOf(value, Class)`
<br />
Gets an instance of the given value if is an instance of the given Class, otherwise it will
create an instance.

* `Safe.length(value)`
<br />
Gets the length of the value.

* `Safe.coerce(value, expected)`
Gets the value coerced by the expected value type.

**Example** Array

```js


var Safe = Divhide.Safe;

var value = Safe.array(1);
expect(value)
    .equals([1]);

var value = Safe.array(1);
expect(value)
    .equals([1]);

var value = Safe.array([1, 2]);
expect(value)
    .equals([1, 2]);

var value = Safe.array(null, [ 1, 2 ]);
expect(value)
    .equals([1, 2]);

var value = Safe.array("1", [1, 2]);
expect(value)
    .equals(["1"]);



```

**Example** Boolean

```js


var Safe = Divhide.Safe;

var value = Safe.boolean(true);
expect(value).toBe(true);

var value = Safe.boolean(false);
expect(value).toBe(false);

var value = Safe.boolean(1);
expect(value).toBe(true);

var value = Safe.boolean("1");
expect(value).toBe(true);

var value = Safe.boolean("0");
expect(value).toBe(false);

var value = Safe.boolean({});
expect(value).toBe(false);

var value = Safe.boolean({}, true);
expect(value).toBe(true);

var value = Safe.boolean([]);
expect(value).toBe(false);

var value = Safe.boolean(null);
expect(value).toBe(false);



```

**Example** Function

```js


var Safe = Divhide.Safe;

var fn = Safe.function(function(){});
expect(fn())
    .toBe(undefined);

var fn = Safe.function("");
expect(fn())
    .toBe(undefined);

var fn = Safe.function("", function(){ return 1; });
expect(fn())
    .toBe(1);



```

**Example** Length

```js


var Safe = Divhide.Safe;

var value = Safe.length([1, 2]);
expect(value).toBe(2);

var value = Safe.length({ one: 1, two: 2});
expect(value).toBe(2);

var value = Safe.length(2);
expect(value).toBe(2);

var value = Safe.length("hello");
expect(value).toBe(5);



```

**Example** Number

```js


var Safe = Divhide.Safe;

var value = Safe.number(1);
expect(value).equals(1);

var value = Safe.number("");
expect(value).equals(0);

var value = Safe.number("1");
expect(value).equals(1);

var value = Safe.number({});
expect(value).equals(0);

var value = Safe.number("", 1);
expect(value).equals(1);



```

**Example** Object

```js


var Safe = Divhide.Safe;

var value = Safe.object({ one: 1 });
expect(value).equals({ one: 1 });

var value = Safe.object([]);
expect(value).equals({});

var value = Safe.object([], { one: 1 });
expect(value).equals({ one: 1 });




```

**Example** Regex

```js


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



```

**Example** String

```js


var Safe = Divhide.Safe;

var value = Safe.string("");
expect(value).toBe("");

var value = Safe.string({});
expect(value).toBe("");

var value = Safe.string({}, "default");
expect(value).toBe("default");




```

**Example** Value

```js


var Safe = Divhide.Safe;

var value = Safe.value(1);
expect(value).toBe(1);

var value = Safe.value("1");
expect(value).toBe("1");

var value = Safe.value(null);
expect(value).toBe(null);

var value = Safe.value(undefined);
expect(value).toBe(null);

var value = Safe.value(null, 1);
expect(value).toBe(1);




```



### Obj

Object facility provides some utility function to use on Objects.

**Methods**

* `filter(value, filter)`
<br />
Returns an array with all the keys that match the __filter__.


**Example**

```js


var Obj = Divhide.Obj;

var results = Obj.filter({ "one": 1, "two": 2 });
expect(results)
    .toEqual(["one", "two"]);

var results = Obj.filter({ "one": 1, "two": 2 }, "one");
expect(results)
    .toEqual(["one"]);


var results = Obj.filter({ "one": 1, "two": 2 }, "three");
expect(results)
    .toEqual([]);


```


### Arr

Array facility provides an API to easily manage array references.

**Methods**

* `index(value, index)`
<br />
Gets the value of the index.

* `first(value)`

* `last(value)`

* `length(value)`

* `insert(array, value, index?)`
Inserts the given value(s) on the given index of the __array__.

* `remove(array, index, n?)`
Removes the given __n__ elements from the __index__ from the __array__.


**Example**

```js


var Arr = Divhide.Arr;

var value = Arr.index([1 ,2, 3], 0);
expect(value).toBe(1);

var value = Arr.index([1 ,2, 3], 10);
expect(value).toBeNull();

var first = Arr.first([1 ,2, 3]);
expect(first).toBe(first);

var last = Arr.last([1 ,2, 3]);
expect(last).toBe(3);

var length = Arr.length([1 ,2, 3]);
expect(last).toBe(3);

var array = [1, 2, 3];
Arr.insert(array, 4);
expect(array).toEqual([1, 2, 3, 4]);

var array = Arr.insert([1 ,2, 3], [4, 5]);
expect(array).toEqual([1, 2, 3, 4, 5]);

var array = Arr.insert([1 ,2, 3], -1, 0);
expect(array).toEqual([-1, 1, 2, 3]);

var array = [1, 2, 3];
Arr.remove(array, 0);
expect(array).toEqual([2, 3]);

var array = [1, 2, 3];
Arr.remove(array, 0, 2);
expect(array).toEqual([3]);



```


## Contribute

#### Testing

The purpose of the project is to provide a library that can be used across every platform that uses javascript. The tests are done using jasmine and using the browser to debug. Every file save on the "src" folder will recompile
the browserify bundle.

``` bash

## open http://localhost:8585/test/ to run the tests on your browser
grunt

```

#### Build

The build process will run a set of tasks including linting and testing. To contribute please add
tests to the fix/feature you've worked.

Also, when building the documention is compiled into the README.md. Each module iniside the "src" directory
should contain a ".md" file to document it's behaviour.

The following command will run the build.

``` bash

grunt build

```

#### Release

``` bash

## change the package.json, bower.json pre-release version (v1.0.0-1)
grunt bump:prerelease

## change the package.json, bower.json minor version (v1.0.1)
grunt bump:patch

## Publish current version to npm and bower
grunt publish

```




## Authors

**Oscar Brito**

+ [github/aetheon](https://github.com/aetheon)
+ [twitter/aetheon](http://twitter.com/aetheon)




## License
Copyright (c) 2015 Oscar Brito <aetheon@gmail.com>, contributors.
Released under the  license

