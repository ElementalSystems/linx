
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