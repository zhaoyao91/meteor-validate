validate.setDefaultValidator('basic');

validate.putValidator('basic');

validate.extendValidator('basic', {
    where: function (arg, func) {
        return func(arg);
    },

    exists: function (arg) {
        return arg !== null && arg !== undefined;
    },

    isType: function (arg, type) {
        return typeof arg === type;
    },

    isClass: function (arg, clazz) {
        return arg instanceof clazz;
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
        for (var i in values) {
            if (arg == values[i]) return true;
        }
        return false;
    },

    notIn: function (arg, values, week) {
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

    isBoolean: function(arg) {
        return typeof arg === 'boolean';
    },

    isNumber: function (arg) {
        return typeof arg === 'number';
    },

    isString: function(arg) {
        return typeof arg === 'string';
    },

    isFunction: function(arg) {
        return typeof arg ==='function';
    },

    isObject: function(arg) {
        return arg !== null && typeof arg === 'object';
    },

    isDate: function(arg) {
        return arg instanceof Date;
    }
});