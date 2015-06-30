describe('lambda', function () {
   describe('isObject', function(){
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

       // this is in fact a feature of basic validator, not the core of the package
       // use es6 lambda
       var checkFunc = function(arg) {
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
       };

       it('should pass when all sub field validations pass', function () {
           expect(checkFunc.bind(null, obj)).not.toThrow();
       });

       it('should throw when some sub field validations fail', function () {
           expect(checkFunc.bind(null, obj1)).toThrowError(ErrorMsg);
           expect(checkFunc.bind(null, obj2)).toThrowError(ErrorMsg);
       })
   });

    describe('oneOf', function() {
        it('should be ok when one of validation pass', function(){
            expect(function () {
                validate(1).oneOf(
                    v=>v.isNumber(),
                    v=>v.isString()
                )
            }).not.toThrow();
            expect(function () {
                validate('1').oneOf([
                        v=>v.isNumber(),
                        v=>v.isString()
                ])
            }).not.toThrow();
        });
        it('should throw when all of the validations fail', function() {
            expect(function () {
                validate({}).oneOf(
                        v=>v.isNumber(),
                        v=>v.isString()
                )
            }).toThrowError(ErrorMsg);
            expect(function () {
                validate({}).oneOf([
                        v=>v.isNumber(),
                        v=>v.isString()
                ])
            }).toThrowError(ErrorMsg);
        });
    })
});