validate.extend({
    // optional

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
    }
});