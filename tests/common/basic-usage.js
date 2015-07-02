describe('basic usage', function () {
    describe('optional', function () {
        it('should pass when is not exists or ok', function () {
            expect(function () {
                validate().optional().isNumber();
            }).not.toThrow();
            expect(function () {
                validate(1).optional().isNumber();
            }).not.toThrow();
        });
        it('should throw when exists and not ok', function () {
            expect(function () {
                validate('s').optional().isNumber();
            }).toThrowError(ErrorMsg);
        })
    });

    describe('chain', function () {
        it('should pass when all validations pass', function () {
            expect(function () {
                validate(5).isNumber().gt(4).lt(10);
            }).not.toThrow();
        });
        it('should throw when some validations fail', function () {
            expect(function () {
                validate(5).isNumber().gt(6).lt(10);
            }).toThrowError(ErrorMsg);
        })
    });

    describe('sub fields', function () {
        var obj = {
            id: '1',
            projectId: '2',
            role: 'admin',

            profile: {
                user: 'bob',
                picture: 'some pic',
                about: 'I am bob'
            }
        };

        var obj1 = {
            id: 1,
            projectId: '2',
            role: 'admin',

            profile: {
                user: 'bob',
                picture: 'some pic',
                about: 'I am bob'
            }
        };

        var obj2 = {
            id: '1',
            projectId: '2',
            role: 'admin',

            profile: {
                user: 1,
                picture: 'some pic',
                about: 'I am bob'
            }
        };

        var checkFunc1 = function (arg) {
            validate(arg).isObject()
                .validate('id').optional().isString().back()
                .validate('projectId').optional().isString().back()
                .validate('profile').optional().isObject()
                    .validate('user').optional().isString().back()
                    .validate('picture').optional().isString().back()
                    .validate('about').optional().isString().back()
                    .back()
                .validate('role').optional().isString();
        };

        var checkFunc2 = function (arg) {
            validate(arg).isObject()
                ('id').optional().isString()()
                ('projectId').optional().isString()()
                ('profile').optional().isObject()
                    ('user').optional().isString()()
                    ('picture').optional().isString()()
                    ('about').optional().isString()()
                    ()
                ('role').optional().isString();
        };

        // this is in fact a feature of basic validator, not the core of the package
        var checkFunc3 = function(arg) {
            validate(arg).isObject({
                id: function(v){v.optional().isString()},
                projectId: function(v){v.optional().isString()},
                role: function(v){v.optional().isString()},
                profile: function(v){v.isObject({
                    user: function(v){v.optional().isString()},
                    picture: function(v){v.optional().isString()},
                    about: function(v){v.optional().isString()}
                })}
            });
        };

        it('should pass when all sub field validations pass', function () {
            expect(checkFunc1.bind(null, obj)).not.toThrow();
            expect(checkFunc2.bind(null, obj)).not.toThrow();
            expect(checkFunc3.bind(null, obj)).not.toThrow();
        });

        it('should throw when some sub field validations fail', function () {
            expect(checkFunc2.bind(null, obj1)).toThrowError(ErrorMsg);
            expect(checkFunc1.bind(null, obj1)).toThrowError(ErrorMsg);
            expect(checkFunc3.bind(null, obj1)).toThrowError(ErrorMsg);

            expect(checkFunc2.bind(null, obj2)).toThrowError(ErrorMsg);
            expect(checkFunc1.bind(null, obj2)).toThrowError(ErrorMsg);
            expect(checkFunc3.bind(null, obj2)).toThrowError(ErrorMsg);
        })
    });

    describe('not', function() {
        it('should pass when not pass', function() {
            expect(function () {
                validate(1).not().isString().isNumber();
            }).not.toThrow();
        });
        it('should not pass when pass', function() {
           expect(function () {
               validate(1).not().isNumber();
           }).toThrowError(ErrorMsg);
        });
    });

    describe('not optional', function() {
        it('should pass when exists and not optional', function () {
            expect(function () {
                validate(1).not().optional().isNumber();
            }).not.toThrow();
        });
        it('should not pass when not exists and not optional', function () {
            expect(function () {
                validate(null).not().optional().isNull();
            }).toThrowError(ErrorMsg);
        })
    })
});