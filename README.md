# meteor-validate

**Validate arguments of methods in an easy way.**  

## Installation
`meteor add zhaoyao91:validate`

## Introduction
Inspired by [Meteor.check](http://docs.meteor.com/#/full/check), [validator](https://github.com/chriso/validator.js) and [koa-validator](https://github.com/RocksonZeta/koa-validate), this package helps you validate the arguments of methods in a chainable, readable and easy way.  
It's actually an extendable module with a very small set of core functions. You can easily add validations to it. Even if you don't want to extend it, the built-in validations and adapted validations from [validator](https://github.com/chriso/validator.js) can help you replace Meteor.check right now.

## Basic Usage
### basic
    // if validating fails, a Match.Error will be thrown on the server 
    // and the client will receive the corresponding Meteor.Error with details.
    validate(arg).exists(); // ensure arg is not null or undefined

### chain
    validate(arg).optional().isString();
    validate(arg).isDate().gt(new Date('2015-01-01')).lt(new Date('2015-12-31'));

### customized arg name
    // the error msg will use the the second parameter as the name of arg
    validate(arg, 'myArg').exists();

### sub fields
    // validating sub fields
    var vArg = validate(arg).optional().isType('object'); // validate arg
    vArg.validate('name').isType('string'); // validate arg.name
    var vFriends = vArg.validate('friends').optional().isType('object'); // validate arg.friends
    vFriends.validate('bob').isType('string'); // validate arg.friends.bob
    vFriends.validate('alice').optional().isType('string'); // validate arg.friends.alice

## Basic Validations
- **optional()** - if the arg is null or undefined, the following validations will always pass.
- **where(func)** - the func receives one arg(the arg to be validate) and returns boolean to tell if it's valid.
- **exists()** - check if the arg is not null or undefined.
- **isType(types)** - check if the arg is **typeof** any of types.
- **isClass(classes)** - check if the arg is **instanceof** any of classes.
- **eq(target)** - check if the arg equals the target. (==)
- **neq(target)** - check if the arg not equals the target. (!=)
- **gt(target)** - check if the arg is greater than target. (>)
- **lt(target)** - check if the arg is less thran target. (<)
- **ge(target)** - check if the arg is greater than or equal to target. (>=)
- **le(target)** - check if the arg is less than or equal to target. (<=)
- **in(values)** - check if the arg equals one of values. (== for true)
- **notIn(values)** - check if the arg not equals any of the values. (== for false)
- **isUndefined()** - check if the arg is undefined.
- **isNull()** - check if the arg is null.
- **isNaN()** - check if the arg is NaN.
- **isBoolean()** - check if the arg is boolean.
- **isNumber()** - check if the arg is number.
- **isString()** - check if the arg is String.
- **isFunction()** - check if the arg is function.
- **isObject()** - check if the arg is object and not null.
- **isDate()** - check if the arg is an instance of Date.

## String Validations
Thanks for [chriso/validator.js](https://github.com/chriso/validator.js),
by calling `validate(arg).asString()`, you can switch to another set of validations that is designated for strings.  
See [full list](https://github.com/chriso/validator.js#validators).  
**Note**: As mentioned in the [doc](https://github.com/chriso/validator.js#strings-only), these validations are **strings only**, and after you call `asString()`, the arg will be treated as string by the rules.  
**Note**: As Meteor's `Npm.require` can only work on server side, these string validations can't be used on client side. Howere, you can create your own validator(validations) for replacement. If interested, read on.

## Advanced Usage
The true power of this package is not the built-in validations, but the ability for easy extention.  

### Concepts
A **Validator** is an object which holds the arg and a set of **Validations**. You create a validator with the arg, call validations on it, that's all.
There are 2 built-in validator classes: **basic** and **asString**. When you call `validate(arg).basic()` or `validate(arg).asString()`, you actually get a corresponding validator. Note that you can just call `validate(arg)` to get a basic validator because it's **default**.

### Add Validator
Call `validate.putValidator(validatorName, options)` to add or override a validator class.  
After adding validator class, you can call `validate(arg).validatorName()` to use it.

 - **options.converter** function(arg) => arg - a function which converts the arg before validation.

### Add Validations
Call `validate.extendValidator(validatorName, validations)` to add or override validations to a validator class.  
After adding validations, you can call `validate(arg).validatorName().validationName(...)` to use it.

 - **validations** object - key is the validation name, value is a test function. a test function is function which returns boolean and takes any number of arguments, with the first arg to be validated.

### Default Validator
Call `validate.setDefaultValidator(validatorName)` to set a default validator class. `validate(arg)` and `someValidator.validate(argName)` will return an instance of default validator class.

## Changelog

### 2.2.0 (2015-06-28)
 - enhance `isType` and `isClass`, now you can specify more targets of **or** relation.

### 2.1.0 (2015-06-28)
 - optimize the syntax for `in` and `notIn`.

### 2.0.1 (2015-06-28)
 - fix that when parent arg is null and optional, error occurs when validate sub fields.

### 2.0.0 (2015-06-28)
 - drop 'str' prefixed validations.
 - add concept of validator and make it extendable.
 - change the api of extention.
 - add some built-in type-checking validations.
 - refactor the codes.

### 1.0.0 (2015-06-27)
 - first version.
