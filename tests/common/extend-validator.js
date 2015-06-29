describe('extend validator', function () {
    it('should add a new validator', function () {
        expect(function () {
            validate.addValidator('double', {
                converter: function (arg) {
                    return arg * 2
                }
            });
        }).not.toThrow();
    });

    it('should add some new validations', function () {
        expect(function () {
            validate.addValidation('double', 'equals', function (arg, target) {
                return arg == target;
            });
        }).not.toThrow();
    });

    it('should double the arg', function () {
        expect(function () {
            validate(2).double().equals(4).basic().eq(4).back().back().eq(2);
        }).not.toThrow();
    });

    it('should set default validator', function () {
        validate.setDefaultValidator('double');
        expect(function () {
            validate(2).equals(4);
        }).not.toThrow();
        validate.setDefaultValidator('basic');
    });
});