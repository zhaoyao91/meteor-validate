describe('asString validator', function() {
    describe('contains', function() {
        it('should be ok when contains', function() {
            expect(function () {
                validate('hello bob').asString().contains('bob');
            }).not.toThrow();
        });
        it('should throw when not contains', function(){
           expect(function(){
               validate('hello world').asString().contains('bob');
           }).toThrow();
        });
    });

    describe('isEmail', function () {
        it('should be ok when is email', function () {
            expect(function () {
                validate('qq@qq.com').asString().isEmail();
            }).not.toThrow();
        });
        it('should throw when is not email', function () {
            expect(function () {
                validate('www.qq.com').asString().isEmail();
            }).toThrowError(ErrorMsg);
        })
    })
});