
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
