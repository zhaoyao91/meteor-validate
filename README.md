# meteor-validate

**Validate arguments of methods in an easy way.**  

## Installation
`meteor add zhaoyao91:validate`

## Introduction
Inspired by [Meteor.check](http://docs.meteor.com/#/full/check), [validator](https://github.com/chriso/validator.js) and [koa-validator](https://github.com/RocksonZeta/koa-validate), this package helps you validate the arguments of methods in a chainable, readable and easy way.  
It's actually an extendable module with a very small set of core functions. You can easily add validations to it. Even if you don't want to extend it, the built-in validations and adapted validations from [validator](https://github.com/chriso/validator.js) can help you replace Meteor.check right now.

## Usage
### basic
    // if validating fails, a Match.Error will be thrown on the server 
    // and the client will receive the corresponding Meteor.Error with details.
    validate(arg).exists(); // ensure arg is not null or undefined

### chain
    validate(arg).optional().isType('string');
    validate(arg).isClass(Date).gt(new Date('2015-01-01')).lt(new Date('2015-12-31'));

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

### extend
    // you can extend validations as you like
    validate.extend('isHelloWorld', function (arg) {
        return typeof arg === 'hello world';
    });
    
    // in some method
    validate(arg).isHelloWorld();

### optional arguments
    // your validations can take any number of optional arguments
    validate.extend('isSumOf', function (arg, number1, number2) {
        return typeof arg === number1 + number2;
    });
    
    // in some method
    validate(arg, 'sum').isSumOf(1,3);

### batch extend
    // you can extend a batch validations with a single call 
    // by passing into an object of validations
    validate.extend({
        isGreaterThan: function (arg, number) {
            return arg > number;
        },
    
        isSumOf: function(arg, number1, number2) {
            return arg === number1 + number2;
        }
    });

## Built-in validations
- **optional()** - if the arg is null or undefined, the following validations will always pass.
- **where(func)** - the func receives one arg(the arg to be validate) and returns boolean to tell if it's valid.
- **exists()** - check if the arg is not null or undefined.
- **isType(type)** - check if the arg is **typeof** the type.
- **isClass(class)** - check if the arg is **instanceof** the class.
- **eq(target)** - check if the arg equals the target. (==)
- **neq(target)** - check if the arg not equals the target. (!=)
- **gt(target)** - check if the arg is greater than target. (>)
- **lt(target)** - check if the arg is less thran target. (<)
- **ge(target)** - check if the arg is greater than or equal to target. (>=)
- **le(target)** - check if the arg is less than or equal to target. (<=)
- **in(values)** - check if the arg equals one of values. (== for true)
- **notIn(values)** - check if the arg not equals any of the values. (== for false)

## Validator-adapted validations
Besides the built-in validations, there are also [validator-adapted validations](https://github.com/chriso/validator.js#validators) you can use.  
**Node**: as mentioned in the [offical doc](https://github.com/chriso/validator.js#strings-only), these validations are **string only**. In order to emphasize this and avoid confusion with future extentions, these validations are prefixed with **'str'**, so you can call `isEmail` by calling `strIsEmail`.

## Note
This package can work on both server and client sides, but, because Meteor's `Npm.require` can only work on server side, you can only use validator-adapted validations on server side.
