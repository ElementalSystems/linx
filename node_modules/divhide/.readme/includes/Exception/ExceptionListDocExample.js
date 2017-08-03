
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

