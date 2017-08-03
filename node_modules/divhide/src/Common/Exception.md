
The Exception package provides some utilities created in order to normalize the Error handling.

All the Exceptions classes inherit from Error. Also, these classes are using the I18N
package.


### Exception

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

{%= _.include("Exception/ExceptionDocExample.js") %}

```

### ExceptionList

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

{%= _.include("Exception/ExceptionListDocExample.js") %}

```