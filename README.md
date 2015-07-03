# meteor-validate

**Validate arguments of methods in an easy way.**  

## Installation
`meteor add zhaoyao91:validate`

## Introduction
Inspired by [Meteor.check](http://docs.meteor.com/#/full/check), [validator](https://github.com/chriso/validator.js) and [koa-validator](https://github.com/RocksonZeta/koa-validate), this package helps you validate the arguments of methods in a chainable, readable and easy way.
  
It's actually an extendable module with a very small set of core functions. You can easily add validations to it. Even if you don't want to extend it, the built-in validations and adapted validations from [validator](https://github.com/chriso/validator.js) can help you replace Meteor.check right now.

## Basic Usage
### basic
If validating fails, a Match.Error will be thrown on the server, 
and the client will receive the corresponding Meteor.Error with details.

    validate(arg).exists(); // check the arg is not null or undefined

### chain
You can check an arg more than once in a validation chain.

    validate(arg).optional().isString();
    validate(arg).isDate().gt(new Date('2015-01-01')).lt(new Date('2015-12-31'));

### customized arg name
The error msg will use the the second parameter as the name of the arg

    validate(arg, 'myArg').exists();

### optional
If the arg is optional and is null or undefined, all the following validations will pass.

    validate(null).optional().isNumber(); // pass
    validate('bob').optional().isNumber(); // throw

### not
You can check the opposite of a validation.

    validate('bob').not().isNumber(); // pass
    validate(1).not().isNumber(); // throw
    
**Note**: `.not()` only affects the following **one** validation.

### one of
You can check if the arg pass one of some validations.

    validate(arg).oneOf(
        function(v){v.isNumber()},
        function(v){v.isString()}
    )
    
    validate(arg).oneOf([
        function(v){v.isNumber()},
        function(v){v.isString()}
    ])

**Note**: this is a feature of the basic validator, not the core of the package.

### array
You can check the arg is an array and make sure all elements satisfy some validation.

    validate([1,'2',3]).isArray(); // pass
    validate([1,'2',3]).isArray(function(v){v.isNumber()}); // throw

**Note**: this is a feature of the basic validator, not the core of the package.

### sub fields (check object)
If the arg is an object(or array), you can check it with all the sub fields in one chain!

    validate(arg).isObject()
        .validate('id').optional().isString().back()
        .validate('projectId').optional().isString().back()
        .validate('profile').optional().isObject()
            .validate('user').optional().isString().back()
            .validate('picture').optional().isString().back()
            .validate('about').optional().isString().back()
            .back()
        .validate('role').optional().isString();
        
You can suppose that there is a corsur pointing to the arg after calling `validate(arg)`, and when you call `.validate('sub field name')`, the corsur moves forward to this sub field, and when you call `.back()`, it moves back to the parent field(arg).

If you are already familiar with this pattern, there is a terser syntax for the same thing:

    validate(arg).isObject()
        ('id').optional().isString()()
        ('projectId').optional().isString()()
        ('profile').optional().isObject()
            ('user').optional().isString()()
            ('picture').optional().isString()()
            ('about').optional().isString()()
            ()
        ('role').optional().isString();
        
In this way, `('sub field name')` is short for `.validate('sub field name')` and `()` is short for `.back()`.

After version 3.1.0, you can check object in a nested way:

    validate(arg).isObject({
        id:         function(v){v.optional().isString()},
        projectId:  function(v){v.optional().isString()},
        role:       function(v){v.optional().isString()},
        profile:    function(v){v.isObject({
            user:       function(v){v.optional().isString()},
            picture:    function(v){v.optional().isString()},
            about:      function(v){v.optional().isString()}
        })}
    });
    
**Note**: the nested checking is a feature of the basic validator, not the core of the package.

### if lambda is supported
If lambda is supported(by [es6](https://github.com/grigio/meteor-babel) or [coffeescript](https://atmospherejs.com/meteor/coffeescript)), then some cases may be even simpler:

**oneOf**

    validate(1).oneOf(
        v=>v.isNumber(),
        v=>v.isString()
    )

**isArray**

    validate([1,'2',3]).isArray(v=>v.isNumber())

**isObject**

    validate(arg).isObject({
       id:          v=>v.optional().isString(),
       projectId:   v=>v.optional().isString(),
       role:        v=>v.optional().isString(),
       profile:     v=>v.isObject({
           user:        v=>v.optional().isString(),
           picture:     v=>v.optional().isString(),
           about:       v=>v.optional().isString()
       })
    });

## Basic Validations
- **not()** - the following validation will check its opposite. **Note**: `.not().optional()` is alias to `.exists()`.
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
- **isObject([validations])** - check if the arg is an object and not null.
- **isDate()** - check if the arg is an instance of Date.
- **isArray([validation])** - check if the arg is an array.
- **oneOf(validations)** - check if the arg satisfies one of the validations.
- **isLength(length)** - check if arg.length equals target length. (.length == length)
- **minLength(min)** - check if arg.length is not less than min. (.length >= min)
- **maxLength(max)** - check if arg.length is not more than max. (.length <= max)

## String Validations
Thanks for [chriso/validator.js](https://github.com/chriso/validator.js),
by calling `validate(arg).asString()`, you can switch to another set of validations which is designated for strings.

See [full list](https://github.com/chriso/validator.js#validators).

**Note**: As mentioned in the [doc](https://github.com/chriso/validator.js#strings-only), these validations are **strings only**, and after you call `asString()`, the arg will be treated as string by the rules.

**Note**: As Meteor's `Npm.require` can only work on server side, these string validations can't be used on client side. Howere, you can create your own validator(validations) for replacement. If interested, read on.

**Node**: After calling `.asString()`, you can't use the basic validations. you can call `.back()` to switch back and use those validations. For more, see the [advanced doc][advanced doc].

## Advanced Usage
See [advanced doc][advanced doc].

## Change Log
See [change log](https://github.com/zhaoyao91/meteor-validate/blob/master/docs/changelog.md)

## Tests
Inside the project including this package, type: `VELOCITY_TEST_PACKAGES=1 meteor test-packages --driver-package velocity:html-reporter zhaoyao91:validate`

## Todos
Collect more frequent used validations into basic validator. Welcome any helps or suggestions.
Implement string validations in basic validator.

## Curious Space
What should this space do?

  [advanced doc]: https://github.com/zhaoyao91/meteor-validate/blob/master/docs/advanced.md
