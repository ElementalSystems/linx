
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
