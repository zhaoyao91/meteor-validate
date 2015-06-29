validate.setDefaultValidator('basic');

validate.addValidator('basic');

validations = {
    where: function (arg, func) {
        return func(arg);
    },

    exists: function (arg) {
        return arg !== null && arg !== undefined;
    },

    isType: function (arg, types) {
        types = getArgArray(types, arguments);

        for (var i in types) {
            if (typeof arg === types[i]) return true;
        }

        return false;
    },

    isClass: function (arg, classes) {
        classes = getArgArray(classes, arguments);

        for (var i in classes) {
            if (arg instanceof classes[i]) return true;
        }

        return false;
    },

    eq: function (arg, target) {
        return arg == target;
    },

    neq: function (arg, target) {
        return arg != target;
    },

    gt: function (arg, target) {
        return arg > target;
    },

    lt: function (arg, target) {
        return arg < target;
    },

    ge: function (arg, target) {
        return arg >= target;
    },

    le: function (arg, target) {
        return arg <= target;
    },

    in: function (arg, values) {
        values = getArgArray(values, arguments);

        for (var i in values) {
            if (arg == values[i]) return true;
        }

        return false;
    },

    notIn: function (arg, values) {
        values = getArgArray(values, arguments);

        for (var i in values) {
            if (arg == values[i]) return false;
        }

        return true;
    },

    isUndefined: function (arg) {
        return arg === undefined;
    },

    isNull: function (arg) {
        return arg === null;
    },

    isNaN: function (arg) {
        return arg !== arg;
    },

    isBoolean: function (arg) {
        return typeof arg === 'boolean';
    },

    isNumber: function (arg) {
        return typeof arg === 'number';
    },

    isString: function (arg) {
        return typeof arg === 'string';
    },

    isFunction: function (arg) {
        return typeof arg === 'function';
    },

    isObject: function (arg) {
        return arg !== null && typeof arg === 'object';
    },

    isDate: function (arg) {
        return arg instanceof Date;
    },

    isArray: function(arg) {
        return Array.isArray(arg);
    }

};

for (var name in validations) {
    validate.addValidation('basic', name, validations[name]);
}

function getArgArray(firstArg, args) {
    if (Array.isArray(firstArg) && args.length === 2) {
        return firstArg;
    }
    else {
        var argArray = [];
        for (var i = 1; i < args.length; i++) {
            argArray[i - 1] = args[i];
        }
        return argArray;
    }
}